"use client";

import { ArrowLeft, Bookmark, Check, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readStoredStringList, useStoredStringList, writeStoredStringList } from "@/lib/local-state";
import CorrectionLink from "./CorrectionLink";
import { Header } from "./HomeExperience";

type KuralData = { number:number; lines:string[]; chapter:string; section:string; tamil:{author:string;text:string}[]; english:string; sources:{text:string;meaning:string}; license:string };

export default function KuralDetail({ number }: { number: number }) {
  const [data,setData]=useState<KuralData|null>(null); const [error,setError]=useState(false); const [status,setStatus]=useState("");
  const bookmarks=useStoredStringList("living-tamil-kural-bookmarks"); const bookmarked=bookmarks.includes(String(number));
  useEffect(()=>{fetch(`/api/thirukkural/kural/${number}`).then(r=>{if(!r.ok)throw new Error();return r.json()}).then((value:KuralData)=>{setData(value);const recent=readStoredStringList("living-tamil-kural-recent");writeStoredStringList("living-tamil-kural-recent",[String(number),...recent.filter(id=>id!==String(number))].slice(0,12));}).catch(()=>setError(true));},[number]);
  function toggleBookmark(){writeStoredStringList("living-tamil-kural-bookmarks",bookmarked?bookmarks.filter(id=>id!==String(number)):[String(number),...bookmarks]);setStatus(bookmarked?"Bookmark removed":"Kural bookmarked");}
  async function share(){const url=location.href;if(navigator.share)await navigator.share({title:`Thirukkural ${number}`,text:data?.lines.join(" "),url});else await navigator.clipboard.writeText(url);setStatus("Link ready to share");}
  return <div className="site-shell"><Header/><main className="kural-focus"><Link href="/kural"><ArrowLeft/> All Kurals</Link>
    {error&&<section className="library-state"><h1>Meaning temporarily unavailable</h1><p>This Kural depends on public data services. Try again when you are online.</p></section>}
    {!data&&!error&&<section className="library-state">Preparing Kural {number}…</section>}
    {data&&<article><p className="eyebrow">{data.section} · {data.chapter}</p><span>குறள் {number}</span><blockquote lang="ta">{data.lines[0]}<br/>{data.lines[1]}</blockquote><div className="kural-focus-actions"><button onClick={toggleBookmark}><Bookmark fill={bookmarked?"currentColor":"none"}/>{bookmarked?"Saved":"Bookmark"}</button><button onClick={share}>{status?<Check/>:<Share2/>} Share</button></div><p className="sr-status" role="status" aria-live="polite">{status}</p>
      <section><small>தமிழ் பொருள் · {data.tamil[0]?.author}</small><p lang="ta">{data.tamil[0]?.text}</p></section><section><small>English meaning</small><p>{data.english}</p></section><details className="commentaries"><summary>Compare Tamil commentaries</summary>{data.tamil.slice(1).map(item=><div key={item.author}><strong>{item.author}</strong><p lang="ta">{item.text}</p></div>)}</details><p className="meaning-credit">Text: {data.sources.text} · Meanings: {data.sources.meaning} · {data.license}</p><CorrectionLink item={`Kural ${number} — ${data.chapter}`}/>
    </article>}
  </main></div>;
}
