"use client";

import { Trash2 } from "lucide-react";
import { clearLocalMetrics, metricNames, useLocalMetrics } from "@/lib/analytics";
import { Header } from "./HomeExperience";

const labels = {
  discovery_view: "Discoveries opened",
  discovery_complete: "Discoveries completed",
  journey_continue: "Journey continuations",
  journey_complete: "Journeys completed",
  discovery_save: "Discoveries saved",
  discovery_share: "Shares attempted",
  correction_open: "Correction forms opened",
};

export default function LocalInsights() {
  const totals = useLocalMetrics();
  return <div className="site-shell"><Header/><main className="insights-page">
    <p className="eyebrow">Private MVP feedback loop</p>
    <h1>Your local insights</h1>
    <p>These aggregate counts are stored only in this browser. They contain no names, reading text, page identifiers, or raw activity history, and nothing is transmitted.</p>
    <section>{metricNames.map((name) => <article key={name}><strong>{totals[name] ?? 0}</strong><span>{labels[name]}</span></article>)}</section>
    <button onClick={() => { if (window.confirm("Clear all locally stored insight counts?")) clearLocalMetrics(); }}><Trash2 size={15}/> Clear local counts</button>
  </main></div>;
}
