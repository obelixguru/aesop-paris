import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ANALYTICS_FILE = path.join(process.cwd(), "data", "analytics.json");

interface PageviewEvent {
  type: "pageview";
  path: string;
  referrer: string;
  userAgent: string;
  timestamp: string;
  sessionId: string;
}

interface AnalyticsData {
  pageviews: PageviewEvent[];
}

async function getAnalytics(): Promise<AnalyticsData> {
  try {
    const data = await fs.readFile(ANALYTICS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { pageviews: [] };
  }
}

async function saveAnalytics(data: AnalyticsData) {
  await fs.mkdir(path.dirname(ANALYTICS_FILE), { recursive: true });
  await fs.writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { path: pagePath, referrer = "", sessionId = "" } = await request.json();

    if (!pagePath || typeof pagePath !== "string") {
      return NextResponse.json({ error: "path required" }, { status: 400 });
    }

    const analytics = await getAnalytics();

    analytics.pageviews.push({
      type: "pageview",
      path: pagePath,
      referrer,
      userAgent: request.headers.get("user-agent") || "",
      timestamp: new Date().toISOString(),
      sessionId,
    });

    // Keep last 10000 pageviews to prevent file bloat
    if (analytics.pageviews.length > 10000) {
      analytics.pageviews = analytics.pageviews.slice(-10000);
    }

    await saveAnalytics(analytics);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to record" }, { status: 500 });
  }
}

export async function GET() {
  const analytics = await getAnalytics();

  const now = new Date();
  const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const recentPageviews = analytics.pageviews.filter(
    (pv) => new Date(pv.timestamp) >= last24h
  );
  const weekPageviews = analytics.pageviews.filter(
    (pv) => new Date(pv.timestamp) >= last7d
  );
  const monthPageviews = analytics.pageviews.filter(
    (pv) => new Date(pv.timestamp) >= last30d
  );

  // Top pages
  const pageCounts: Record<string, number> = {};
  for (const pv of monthPageviews) {
    pageCounts[pv.path] = (pageCounts[pv.path] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  // Unique sessions
  const uniqueSessions24h = new Set(recentPageviews.map((pv) => pv.sessionId)).size;
  const uniqueSessions7d = new Set(weekPageviews.map((pv) => pv.sessionId)).size;

  return NextResponse.json({
    summary: {
      pageviews_24h: recentPageviews.length,
      pageviews_7d: weekPageviews.length,
      pageviews_30d: monthPageviews.length,
      unique_visitors_24h: uniqueSessions24h,
      unique_visitors_7d: uniqueSessions7d,
      total_recorded: analytics.pageviews.length,
    },
    topPages,
  });
}
