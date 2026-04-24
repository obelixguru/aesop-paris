import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

interface Subscriber {
  email: string;
  source: string;
  token: string;
  confirmed: boolean;
  subscribedAt: string;
  confirmedAt: string | null;
}

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subscribers: Subscriber[]) {
  await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), { recursive: true });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

// POST — new signup (step 1 of double opt-in)
export async function POST(request: NextRequest) {
  try {
    const { email, source = "footer" } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const subscribers = await getSubscribers();
    const existing = subscribers.find((s) => s.email === email.toLowerCase());

    if (existing?.confirmed) {
      return NextResponse.json({
        message: "Vous êtes déjà inscrit.",
        status: "already_subscribed",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    if (existing) {
      existing.token = token;
      existing.source = source;
    } else {
      subscribers.push({
        email: email.toLowerCase(),
        source,
        token,
        confirmed: false,
        subscribedAt: new Date().toISOString(),
        confirmedAt: null,
      });
    }

    await saveSubscribers(subscribers);

    // In production, send confirmation email via Resend here
    // For now, log the confirmation link
    const confirmUrl = `${request.nextUrl.origin}/newsletter/confirmer?token=${token}`;
    console.log(`[Newsletter] Confirmation link for ${email}: ${confirmUrl}`);

    return NextResponse.json({
      message:
        "Un email de confirmation vous a été envoyé. Veuillez vérifier votre boîte de réception.",
      status: "pending_confirmation",
    });
  } catch {
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}

// GET — confirm subscription (step 2 of double opt-in)
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token manquant." }, { status: 400 });
  }

  const subscribers = await getSubscribers();
  const subscriber = subscribers.find((s) => s.token === token);

  if (!subscriber) {
    return NextResponse.json({ error: "Lien invalide." }, { status: 404 });
  }

  if (subscriber.confirmed) {
    return NextResponse.json({
      message: "Déjà confirmé.",
      status: "already_confirmed",
    });
  }

  subscriber.confirmed = true;
  subscriber.confirmedAt = new Date().toISOString();
  await saveSubscribers(subscribers);

  return NextResponse.json({
    message: "Inscription confirmée.",
    status: "confirmed",
  });
}
