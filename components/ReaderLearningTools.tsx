"use client";

import { BookMarked, Download, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import type { WordAnnotation } from "@/lib/content";
import { useStoredValue, writeStoredValue } from "@/lib/local-state";

export type ReaderPreferences = { size: "standard" | "large" | "largest"; spacing: "comfortable" | "open"; layer: "original" | "simple" | "english" };
type GlossaryEntry = WordAnnotation & { savedAt: string };
const defaults: ReaderPreferences = { size: "standard", spacing: "comfortable", layer: "original" };

function parse<T>(raw: string | null, fallback: T): T { try { return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; } }

export function useReaderPreferences() {
  const raw = useStoredValue("living-tamil-reader-preferences");
  const preferences = parse(raw, defaults);
  return {
    preferences,
    update: (next: ReaderPreferences) => writeStoredValue("living-tamil-reader-preferences", JSON.stringify(next)),
    reset: () => writeStoredValue("living-tamil-reader-preferences", JSON.stringify(defaults)),
  };
}

export default function ReaderLearningTools({ words }: { words: WordAnnotation[] }) {
  const raw = useStoredValue("living-tamil-glossary");
  const glossary = parse<GlossaryEntry[]>(raw, []);
  const { preferences, update, reset } = useReaderPreferences();
  const [status, setStatus] = useState("");
  const save = (word: WordAnnotation) => {
    if (glossary.some((item) => item.term === word.term)) return;
    writeStoredValue("living-tamil-glossary", JSON.stringify([...glossary, { ...word, savedAt: new Date().toISOString() }]));
    setStatus(`${word.term} saved to your glossary.`);
  };
  const remove = (term: string) => {
    writeStoredValue("living-tamil-glossary", JSON.stringify(glossary.filter((item) => item.term !== term)));
    setStatus(`${term} removed.`);
  };
  const exportGlossary = () => {
    const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), entries: glossary }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "living-tamil-glossary.json"; anchor.click(); URL.revokeObjectURL(url);
    setStatus("Glossary exported.");
  };
  const clear = () => {
    if (!confirm("Clear every saved glossary word from this device?")) return;
    writeStoredValue("living-tamil-glossary", "[]"); setStatus("Glossary cleared.");
  };

  return <section className="learning-tools" aria-labelledby="learning-heading">
    <div className="learning-heading"><div><small>Personal learning · stored only on this device</small><h2 id="learning-heading">Make the reader yours.</h2></div><BookMarked aria-hidden="true" /></div>
    <div className="preference-grid">
      <label>Tamil text size<select value={preferences.size} onChange={(event)=>update({...preferences,size:event.target.value as ReaderPreferences["size"]})}><option value="standard">Standard</option><option value="large">Large</option><option value="largest">Largest</option></select></label>
      <label>Line spacing<select value={preferences.spacing} onChange={(event)=>update({...preferences,spacing:event.target.value as ReaderPreferences["spacing"]})}><option value="comfortable">Comfortable</option><option value="open">More open</option></select></label>
      <label>Default layer<select value={preferences.layer} onChange={(event)=>update({...preferences,layer:event.target.value as ReaderPreferences["layer"]})}><option value="original">Original Tamil</option><option value="simple">Simple Tamil</option><option value="english">English</option></select></label>
      <button className="quiet-button" onClick={reset}><RotateCcw size={14}/> Reset</button>
    </div>
    {words.length > 0 && <div className="word-grid">{words.map((word)=>{
      const saved = glossary.some((item)=>item.term===word.term);
      return <article key={word.term}><strong lang="ta">{word.term}</strong><p lang="ta">{word.simple}</p><p>{word.english}</p><small>{word.reviewStatus.replaceAll("-"," ")}</small><button onClick={()=>saved?remove(word.term):save(word)}>{saved?<><Trash2 size={13}/> Remove</>:<><BookMarked size={13}/> Save word</>}</button></article>;
    })}</div>}
    <div className="glossary-summary"><span><strong>{glossary.length}</strong> saved words</span><div><button disabled={!glossary.length} onClick={exportGlossary}><Download size={14}/> Export</button><button disabled={!glossary.length} onClick={clear}><Trash2 size={14}/> Clear</button></div></div>
    <p className="sr-status" role="status" aria-live="polite">{status}</p>
  </section>;
}
