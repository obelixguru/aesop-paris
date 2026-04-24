"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("aesop_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("aesop_sid", sid);
  }
  return sid;
}

export function trackEvent(
  action: string,
  category = "interaction",
  label = "",
  value: number | null = null
) {
  const sessionId = getSessionId();
  const path = window.location.pathname;

  navigator.sendBeacon(
    "/api/analytics/event",
    JSON.stringify({ category, action, label, value, path, sessionId })
  );
}

export default function PageViewTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef<string>("");

  useEffect(() => {
    if (pathname === lastPathRef.current) return;
    lastPathRef.current = pathname;

    const sessionId = getSessionId();

    navigator.sendBeacon(
      "/api/analytics/pageview",
      JSON.stringify({
        path: pathname,
        referrer: document.referrer,
        sessionId,
      })
    );
  }, [pathname]);

  return null;
}
