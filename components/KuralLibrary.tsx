"use client";

import { ArrowLeft, BookMarked, Check, ChevronDown, Copy, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import CorrectionLink from "./CorrectionLink";
import { useStoredStringList } from "@/lib/local-state";
import { Header } from "./HomeExperience";

type Library = {
  paals: { id: number; paal: string; athikaaram: { count: number } }[];
  chapters: { id: number; athikaaram: string }[];
  kurals: { number: number; lines: string[]; chapterId: number; paalId: number }[];
  source: string; license: string;
};
type Meaning = { number: number; chapter: string; section: string; tamil: { author: string; text: string }[]; english: string; source: string; license: string };

const pageSize = 30;

function useRequestedKural() {
  const search = useSyncExternalStore(() => () => undefined, () => window.location.search, () => "");
  const requested = Number(new URLSearchParams(search).get("number"));
  return requested >= 1 && requested <= 1330 ? requested : null;
}

export default function KuralLibrary() {
  const requested = useRequestedKural();
  const bookmarks = useStoredStringList("living-tamil-kural-bookmarks");
  const recent = useStoredStringList("living-tamil-kural-recent");
  const [library, setLibrary] = useState<Library | null>(null);
  const [error, setError] = useState(false);
  const [queryOverride, setQuery] = useState<string | null>(null);
  const query = queryOverride ?? String(requested ?? "");
  const [paal, setPaal] = useState(0);
  const [chapter, setChapter] = useState(0);
  const [limit, setLimit] = useState(pageSize);
  const [selectedOverride, setSelected] = useState<number | null | undefined>(undefined);
  const selected = selectedOverride === undefined ? requested : selectedOverride;
  const [copied, setCopied] = useState<number | null>(null);
  const [meanings, setMeanings] = useState<Record<number, Meaning>>({});
  const [meaningErrors, setMeaningErrors] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/thirukkural/library").then((response) => { if (!response.ok) throw new Error(); return response.json(); }).then(setLibrary).catch(() => setError(true));
  }, []);

  const results = useMemo(() => {
    if (!library) return [];
    const term = query.trim();
    return library.kurals.filter((item) => {
      const matchesQuery = !term || String(item.number) === term || item.lines.join(" ").includes(term);
      return matchesQuery && (!paal || item.paalId === paal) && (!chapter || item.chapterId === chapter);
    });
  }, [library, query, paal, chapter]);

  function resetPage() { setLimit(pageSize); setSelected(null); }
  function choosePaal(id: number) { setPaal(id); setChapter(0); resetPage(); }
  async function copyKural(number: number, lines: string[]) { await navigator.clipboard.writeText(`குறள் ${number}\n${lines.join("\n")}`); setCopied(number); setTimeout(() => setCopied(null), 1400); }
  function openKural(number: number) {
    if (selected === number) { setSelected(null); return; }
    setSelected(number);
    if (meanings[number]) return;
    fetch(`/api/thirukkural/meaning/${number}`).then((response) => { if (!response.ok) throw new Error(); return response.json() as Promise<Meaning>; }).then((meaning) => setMeanings((current) => ({ ...current, [number]: meaning }))).catch(() => setMeaningErrors((current) => [...current, number]));
  }

  return <div className="site-shell"><Header/><main className="kural-library">
    <Link className="library-back" href="/"><ArrowLeft size={16}/> Back to journeys</Link>
    <section className="kural-hero"><div><p className="eyebrow"><BookMarked size={13}/> Complete open corpus</p><h1>திருக்குறள்</h1><p>Browse all 1,330 couplets through the three Paals and 133 Athikaarams—without leaving Living Tamil.</p></div><div><strong>1,330</strong><span>couplets</span><strong>133</strong><span>chapters</span></div></section>
    {(bookmarks.length>0||recent.length>0)&&<section className="kural-trail">{bookmarks.length>0&&<div><small>Bookmarked</small><nav>{bookmarks.map(id=><Link href={`/kural/${id}`} key={id}>Kural {id}</Link>)}</nav></div>}{recent.length>0&&<div><small>Recently read</small><nav>{recent.map(id=><Link href={`/kural/${id}`} key={id}>Kural {id}</Link>)}</nav></div>}</section>}

    {error && <div className="library-state">The public Kural data service is temporarily unavailable. Your journeys still work normally.</div>}
    {!library && !error && <div className="library-state">Preparing the complete Kural library…</div>}
    {library && <>
      <section className="paal-grid"><button className={paal===0?"active":""} onClick={()=>choosePaal(0)}><small>All three books</small><strong>முழுத் திருக்குறள்</strong><span>1,330 Kurals</span></button>{library.paals.map(item=><button className={paal===item.id?"active":""} onClick={()=>choosePaal(item.id)} key={item.id}><small>பால் {item.id}</small><strong>{item.paal}</strong><span>{item.athikaaram.count} Athikaarams</span></button>)}</section>

      <section className="kural-tools"><label><Search size={17}/><input value={query} onChange={(e)=>{setQuery(e.target.value);resetPage()}} placeholder="Search Tamil text or Kural number"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear"><X size={15}/></button>}</label><label className="chapter-select"><span>அதிகாரம்</span><select value={chapter} onChange={(e)=>{setChapter(Number(e.target.value));resetPage()}}><option value={0}>All Athikaarams</option>{library.chapters.map(item=><option value={item.id} key={item.id}>{item.id}. {item.athikaaram}</option>)}</select><ChevronDown size={15}/></label></section>

      <div className="result-summary"><span>{results.length} Kurals</span>{(paal||chapter||query)&&<button onClick={()=>{setPaal(0);setChapter(0);setQuery("");resetPage()}}>Clear filters</button>}</div>
      <section className="kural-list">{results.slice(0,limit).map(item=>{const chapterData=library.chapters[item.chapterId-1];const isOpen=selected===item.number;const meaning=meanings[item.number];return <article className={isOpen?"open":""} key={item.number}><button className="kural-row" onClick={()=>openKural(item.number)}><span>{item.number}</span><div><small>{chapterData?.athikaaram}</small><p lang="ta">{item.lines[0]}<br/>{item.lines[1]}</p></div><ChevronDown size={17}/></button>{isOpen&&<div className="kural-detail meaning-detail">
        {!meaning&&!meaningErrors.includes(item.number)&&<p className="meaning-loading">Loading Tamil and English meanings…</p>}
        {meaningErrors.includes(item.number)&&<p className="meaning-loading">Meaning is temporarily unavailable. Please try this Kural again later.</p>}
        {meaning&&<><div className="meaning-block"><small>தமிழ் பொருள் · {meaning.tamil[0].author}</small><p lang="ta">{meaning.tamil[0].text}</p></div><div className="meaning-block"><small>English meaning</small><p>{meaning.english}</p></div><details className="commentaries"><summary>Compare Tamil commentaries</summary>{meaning.tamil.slice(1).map(entry=><div key={entry.author}><strong>{entry.author}</strong><p lang="ta">{entry.text}</p></div>)}</details><p className="meaning-credit">Meanings: {meaning.source} · {meaning.license}</p></>}
        <CorrectionLink item={`Kural ${item.number} — ${chapterData?.athikaaram ?? "Thirukkural"}`}/>
        <div className="kural-detail-actions"><button onClick={()=>copyKural(item.number,item.lines)}>{copied===item.number?<Check size={15}/>:<Copy size={15}/>} {copied===item.number?"Copied":"Copy Kural"}</button><Link href={`/kural/${item.number}`}>Focused reading</Link>{item.number===1&&<Link href="/discover/11-kural-beginning">Open contextual discovery</Link>}</div>
      </div>}</article>})}</section>
      {limit<results.length&&<button className="load-more" onClick={()=>setLimit(limit+pageSize)}>Show {Math.min(pageSize,results.length-limit)} more Kurals</button>}
      <footer className="corpus-credit">Corpus supplied by {library.source} · {library.license} licence. Living Tamil editorial notes are maintained separately.</footer>
    </>}
  </main></div>;
}
