"use client";

import { ArrowRight, BookMarked, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Kural = { id: number; kural: string };

export default function KuralToday() {
  const [kural, setKural] = useState<Kural | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/thirukkural/random")
      .then((response) => {
        if (!response.ok) throw new Error("Unavailable");
        return response.json() as Promise<Kural>;
      })
      .then(setKural)
      .catch(() => setError(true));
  }, []);

  const lines = kural?.kural.split("$") ?? [];

  return (
    <section className="kural-today" aria-live="polite">
      <div className="kural-label">
        <BookMarked size={18} />
        <span><small>From the open Kural corpus</small><strong>இன்றைய குறள்</strong></span>
      </div>

      {!kural && !error && <div className="kural-loading"><RefreshCw size={18} /> Loading today’s couplet…</div>}
      {error && <p className="kural-error">Today’s couplet is temporarily unavailable. The rest of Living Tamil still works normally.</p>}
      {kural && (
        <div className="kural-copy">
          <span>குறள் {kural.id}</span>
          <blockquote lang="ta">{lines[0]}<br />{lines[1]}</blockquote>
          <p>Raw couplet from the MIT-licensed Senkanthal API. Living Tamil adds reviewed context separately.</p>
        </div>
      )}

      <Link href={kural?`/kural/${kural.id}`:"/discover/11-kural-beginning"}>{kural?"Read meaning and save":"Understand how to read a Kural"} <ArrowRight size={16} /></Link>
    </section>
  );
}
