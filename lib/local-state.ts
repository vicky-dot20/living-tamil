"use client";

import { useSyncExternalStore } from "react";

const stateEvent = "living-tamil-state-change";
const emptyList = "[]";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(stateEvent, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(stateEvent, onStoreChange);
  };
}

export function useStoredStringList(key: string) {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) ?? emptyList,
    () => emptyList,
  );

  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function writeStoredStringList(key: string, value: string[]) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(stateEvent));
}
