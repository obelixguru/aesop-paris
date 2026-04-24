import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

interface Subscriber {
  email: string;
  source: string;
  confirmed: boolean;
}

export async function GET() {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    const subscribers: Subscriber[] = JSON.parse(data);

    const confirmed = subscribers.filter((s) => s.confirmed).length;
    const pending = subscribers.filter((s) => !s.confirmed).length;

    const sources: Record<string, number> = {};
    for (const s of subscribers) {
      sources[s.source] = (sources[s.source] || 0) + 1;
    }

    return NextResponse.json({
      total: subscribers.length,
      confirmed,
      pending,
      sources,
    });
  } catch {
    return NextResponse.json({
      total: 0,
      confirmed: 0,
      pending: 0,
      sources: {},
    });
  }
}
