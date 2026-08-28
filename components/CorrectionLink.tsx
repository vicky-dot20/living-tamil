"use client";

import { ExternalLink, MessageSquareWarning } from "lucide-react";
import { recordMetric } from "@/lib/analytics";

const categories = ["Factual", "Translation", "Source or rights", "Accessibility"];

function issueUrl(category: string, item: string) {
  const params = new URLSearchParams({
    template: "content.yml",
    title: `[Content]: [${category}] ${item}`,
  });
  return `https://github.com/vicky-dot20/living-tamil/issues/new?${params}`;
}

export default function CorrectionLink({ item }: { item: string }) {
  return <details className="correction-link">
    <summary><MessageSquareWarning size={16}/> Report a correction</summary>
    <div>
      <p>Choose what needs attention. Your report opens as a public GitHub issue; Living Tamil does not collect it inside the app.</p>
      <nav>{categories.map((category) => <a href={issueUrl(category, item)} target="_blank" rel="noreferrer" onClick={() => recordMetric("correction_open")} key={category}>{category}<ExternalLink size={12}/></a>)}</nav>
    </div>
  </details>;
}
