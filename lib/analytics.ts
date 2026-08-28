"use client";

import { useSyncExternalStore } from "react";

export const metricNames = [
  "discovery_view",
  "discovery_complete",
  "journey_continue",
  "journey_complete",
  "discovery_save",
  "discovery_share",
  "correction_open",
] as const;

export type MetricName = (typeof metricNames)[number];
type MetricTotals = Partial<Record<MetricName, number>>;
type MetricStore = { version: 1; totals: MetricTotals };

const storageKey = "living-tamil-analytics-v1";
const analyticsEvent = "living-tamil-analytics-change";
const emptyStore = '{"version":1,"totals":{}}';

function parse(raw: string): MetricStore {
  try {
    const value = JSON.parse(raw) as MetricStore;
    return value?.version === 1 && value.totals ? value : JSON.parse(emptyStore);
  } catch {
    return JSON.parse(emptyStore);
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(analyticsEvent, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(analyticsEvent, onStoreChange);
  };
}

export function recordMetric(name: MetricName) {
  try {
    const store = parse(localStorage.getItem(storageKey) ?? emptyStore);
    store.totals[name] = (store.totals[name] ?? 0) + 1;
    localStorage.setItem(storageKey, JSON.stringify(store));
    window.dispatchEvent(new Event(analyticsEvent));
  } catch {
    // Metrics must never interrupt reading, including when storage is unavailable.
  }
}

export function useLocalMetrics() {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(storageKey) ?? emptyStore,
    () => emptyStore,
  );
  return parse(raw).totals;
}

export function clearLocalMetrics() {
  localStorage.removeItem(storageKey);
  window.dispatchEvent(new Event(analyticsEvent));
}
