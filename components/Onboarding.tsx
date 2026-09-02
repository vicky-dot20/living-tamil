"use client";

import { ArrowRight, BookOpen, Languages, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useStoredValue, writeStoredValue } from "@/lib/local-state";

export default function Onboarding({ startHref }: { startHref: string }) {
  const dismissed = useStoredValue("living-tamil-onboarding") === "complete";
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => { if (!dismissed) closeButton.current?.focus(); }, [dismissed]);
  if (dismissed) return null;

  function finish() { writeStoredValue("living-tamil-onboarding", "complete"); }

  return <div className="onboarding-backdrop" role="presentation" onKeyDown={(event) => { if (event.key === "Escape") finish(); }}>
    <section className="onboarding" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <button ref={closeButton} className="onboarding-close" onClick={finish} aria-label="Skip introduction"><X/></button>
      <p className="eyebrow">Welcome to Living Tamil</p>
      <h1 id="onboarding-title">Understand one meaningful piece of Tamil in five minutes.</h1>
      <div className="onboarding-layers">
        <span><Languages/>Original Tamil</span><span>எளிய தமிழ்<br/><small>Simple Tamil</small></span><span>English</span><span>Context</span><span><BookOpen/>Sources</span>
      </div>
      <p>Move through the Five Landscapes as a guided journey. Every discovery layers the original words with accessible meaning and transparent sources.</p>
      <div className="onboarding-actions"><button onClick={finish}>Explore first</button><Link href={startHref} onClick={finish}>Start Five Landscapes <ArrowRight/></Link></div>
    </section>
  </div>;
}
