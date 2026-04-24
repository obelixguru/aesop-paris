import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const EVENTS_FILE = path.join(process.cwd(), "data", "events.json");

interface TrackingEvent {
  type: string;
  category: string;
  action: string;
  label: string;
  value: number | null;
  path: string;
  sessionId: string;
  timestamp: string;
}

interface EventsData {
  events: TrackingEvent[];
}

async function getEvents(): Promise<EventsData> {
  try {
    const data = await fs.readFile(EVENTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { events: [] };
  }
}

async function saveEvents(data: EventsData) {
  await fs.mkdir(path.dirname(EVENTS_FILE), { recursive: true });
  await fs.writeFile(EVENTS_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const {
      category = "interaction",
      action,
      label = "",
      value = null,
      path: pagePath = "",
      sessionId = "",
    } = await request.json();

    if (!action || typeof action !== "string") {
      return NextResponse.json({ error: "action required" }, { status: 400 });
    }

    const events = await getEvents();

    events.events.push({
      type: "event",
      category,
      action,
      label,
      value,
      path: pagePath,
      sessionId,
      timestamp: new Date().toISOString(),
    });

    // Keep last 10000 events
    if (events.events.length > 10000) {
      events.events = events.events.slice(-10000);
    }

    await saveEvents(events);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to record" }, { status: 500 });
  }
}

export async function GET() {
  const eventsData = await getEvents();

  const now = new Date();
  const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recentEvents = eventsData.events.filter(
    (e) => new Date(e.timestamp) >= last7d
  );

  // Group by action
  const actionCounts: Record<string, number> = {};
  for (const e of recentEvents) {
    const key = `${e.category}:${e.action}`;
    actionCounts[key] = (actionCounts[key] || 0) + 1;
  }

  const topActions = Object.entries(actionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([action, count]) => ({ action, count }));

  return NextResponse.json({
    total_7d: recentEvents.length,
    total_all: eventsData.events.length,
    topActions,
  });
}
