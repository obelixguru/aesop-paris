"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface AnalyticsSummary {
  summary: {
    pageviews_24h: number;
    pageviews_7d: number;
    pageviews_30d: number;
    unique_visitors_24h: number;
    unique_visitors_7d: number;
    total_recorded: number;
  };
  topPages: { path: string; count: number }[];
}

interface EventsSummary {
  total_7d: number;
  total_all: number;
  topActions: { action: string; count: number }[];
}

interface SubscriberStats {
  total: number;
  confirmed: number;
  pending: number;
  sources: Record<string, number>;
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-white p-6 border border-aesop-amber/20">
      <p className="text-sm text-aesop-earth/60 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-3xl font-medium text-aesop-dark">{value}</p>
      {sub && <p className="text-xs text-aesop-earth/50 mt-1">{sub}</p>}
    </div>
  );
}

function FunnelStep({
  label,
  value,
  percentage,
  color,
}: {
  label: string;
  value: number;
  percentage: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-32 text-sm text-aesop-earth/70 text-right">{label}</div>
      <div className="flex-1 bg-aesop-cream rounded-none h-8 relative overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-aesop-dark">
          {value} ({percentage}%)
        </span>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [events, setEvents] = useState<EventsSummary | null>(null);
  const [subscribers, setSubscribers] = useState<SubscriberStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [analyticsRes, eventsRes, subscribersRes] = await Promise.all([
          fetch("/api/analytics/pageview").then((r) => r.json()),
          fetch("/api/analytics/event").then((r) => r.json()),
          fetch("/api/admin/subscribers").then((r) =>
            r.ok ? r.json() : { total: 0, confirmed: 0, pending: 0, sources: {} }
          ),
        ]);
        setAnalytics(analyticsRes);
        setEvents(eventsRes);
        setSubscribers(subscribersRes);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-aesop-cream flex items-center justify-center">
        <p className="text-aesop-earth/60">Chargement du tableau de bord...</p>
      </div>
    );
  }

  const pv = analytics?.summary;
  const funnelTotal = pv?.pageviews_30d || 1;

  // AARRR funnel (estimated from available data)
  const acquisition = pv?.pageviews_30d || 0;
  const activation = pv?.unique_visitors_7d || 0;
  const retention = Math.round(activation * 0.3); // estimate
  const revenue = 0; // no payment yet
  const referral = Math.round(activation * 0.05); // estimate

  return (
    <div className="min-h-screen bg-aesop-cream">
      {/* Header */}
      <header className="border-b border-aesop-amber/20 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium text-aesop-dark">
              Tableau de bord
            </h1>
            <p className="text-sm text-aesop-earth/60">
              Aesop Paris — Analytics AARRR
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-aesop-earth/60 hover:text-aesop-dark transition-colors"
          >
            Retour au site
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPI Cards */}
        <section>
          <h2 className="text-sm uppercase tracking-wider text-aesop-earth/60 mb-4">
            Vue d&apos;ensemble
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Pages vues (24h)"
              value={pv?.pageviews_24h || 0}
              sub={`${pv?.unique_visitors_24h || 0} visiteurs uniques`}
            />
            <StatCard
              label="Pages vues (7j)"
              value={pv?.pageviews_7d || 0}
              sub={`${pv?.unique_visitors_7d || 0} visiteurs uniques`}
            />
            <StatCard
              label="Pages vues (30j)"
              value={pv?.pageviews_30d || 0}
            />
            <StatCard
              label="Abonnés newsletter"
              value={subscribers?.confirmed || 0}
              sub={`${subscribers?.pending || 0} en attente de confirmation`}
            />
          </div>
        </section>

        {/* AARRR Funnel */}
        <section>
          <h2 className="text-sm uppercase tracking-wider text-aesop-earth/60 mb-4">
            Funnel AARRR (30 jours)
          </h2>
          <div className="bg-white border border-aesop-amber/20 p-6 space-y-3">
            <FunnelStep
              label="Acquisition"
              value={acquisition}
              percentage={100}
              color="#D2B48C"
            />
            <FunnelStep
              label="Activation"
              value={activation}
              percentage={Math.round((activation / funnelTotal) * 100)}
              color="#C4A882"
            />
            <FunnelStep
              label="Rétention"
              value={retention}
              percentage={Math.round((retention / funnelTotal) * 100)}
              color="#8B4513"
            />
            <FunnelStep
              label="Revenu"
              value={revenue}
              percentage={Math.round((revenue / funnelTotal) * 100)}
              color="#6B3410"
            />
            <FunnelStep
              label="Parrainage"
              value={referral}
              percentage={Math.round((referral / funnelTotal) * 100)}
              color="#4A2508"
            />
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Top Pages */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-aesop-earth/60 mb-4">
              Pages les plus visitées
            </h2>
            <div className="bg-white border border-aesop-amber/20">
              {analytics?.topPages && analytics.topPages.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-aesop-amber/10">
                      <th className="text-left text-xs uppercase tracking-wider text-aesop-earth/50 px-4 py-3">
                        Page
                      </th>
                      <th className="text-right text-xs uppercase tracking-wider text-aesop-earth/50 px-4 py-3">
                        Vues
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.topPages.map((page) => (
                      <tr
                        key={page.path}
                        className="border-b border-aesop-amber/5 last:border-0"
                      >
                        <td className="px-4 py-3 text-sm text-aesop-dark">
                          {page.path}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-aesop-earth/70 tabular-nums">
                          {page.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-4 py-6 text-sm text-aesop-earth/50 text-center">
                  Aucune donnée encore. Les pages vues apparaîtront ici.
                </p>
              )}
            </div>
          </section>

          {/* Top Events */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-aesop-earth/60 mb-4">
              Événements récents (7j)
            </h2>
            <div className="bg-white border border-aesop-amber/20">
              {events?.topActions && events.topActions.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-aesop-amber/10">
                      <th className="text-left text-xs uppercase tracking-wider text-aesop-earth/50 px-4 py-3">
                        Action
                      </th>
                      <th className="text-right text-xs uppercase tracking-wider text-aesop-earth/50 px-4 py-3">
                        Count
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.topActions.map((event) => (
                      <tr
                        key={event.action}
                        className="border-b border-aesop-amber/5 last:border-0"
                      >
                        <td className="px-4 py-3 text-sm text-aesop-dark">
                          {event.action}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-aesop-earth/70 tabular-nums">
                          {event.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-4 py-6 text-sm text-aesop-earth/50 text-center">
                  Aucun événement enregistré. Les clics CTA et inscriptions
                  newsletter apparaîtront ici.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Newsletter Sources */}
        {subscribers && subscribers.sources && Object.keys(subscribers.sources).length > 0 && (
          <section>
            <h2 className="text-sm uppercase tracking-wider text-aesop-earth/60 mb-4">
              Sources d&apos;inscription newsletter
            </h2>
            <div className="bg-white border border-aesop-amber/20 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(subscribers.sources).map(([source, count]) => (
                  <div key={source} className="text-center">
                    <p className="text-2xl font-medium text-aesop-dark">
                      {count}
                    </p>
                    <p className="text-xs text-aesop-earth/50 uppercase tracking-wider">
                      {source}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
