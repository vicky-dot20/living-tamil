"use client";

import { CheckCircle2, CircleHelp } from "lucide-react";
import { useState } from "react";
import type { Checkpoint } from "@/lib/content";
import { recordMetric } from "@/lib/analytics";

export default function DiscoveryCheckpoint({ checkpoint }: { checkpoint?: Checkpoint }) {
  const [choice, setChoice] = useState<number | null>(null);
  if (!checkpoint) return null;
  const correct = choice === checkpoint.answer;
  return <section className="checkpoint" aria-labelledby="checkpoint-heading">
    <p className="eyebrow"><CircleHelp size={14}/> Optional checkpoint</p><h2 id="checkpoint-heading">{checkpoint.question}</h2>
    <div>{checkpoint.options.map((option, index) => <button key={option} disabled={choice !== null} className={choice === index ? (correct ? "correct" : "incorrect") : ""} onClick={() => { setChoice(index); recordMetric("checkpoint_answer"); }}>{option}</button>)}</div>
    {choice !== null && <p role="status"><CheckCircle2 size={16}/><span><strong>{correct ? "Correct." : `The answer is: ${checkpoint.options[checkpoint.answer]}.`}</strong> {checkpoint.explanation}</span></p>}
  </section>;
}
