"use client";

import { ArrowLeft, ArrowRight, Bookmark, BookOpen, Check, ExternalLink, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Discovery } from "@/lib/content";
import { recordMetric } from "@/lib/analytics";
import { useStoredStringList, writeStoredStringList } from "@/lib/local-state";
import CorrectionLink from "./CorrectionLink";
import { Header } from "./HomeExperience";

const modes = ["original", "simple", "english"] as const;
type Mode = typeof modes[number];

export default function DiscoveryReader({ discovery, journey }: { discovery: Discovery; journey: Discovery[] }) {
  const [mode,setMode]=useState<Mode>("original"); const [copied,setCopied]=useState(false);
  const savedItems=useStoredStringList("living-tamil-saved"); const progress=useStoredStringList("living-tamil-progress");
  const index=journey.findIndex((item)=>item.slug===discovery.slug); const previous=journey[index-1]; const next=journey[index+1];
  const saved=savedItems.includes(discovery.slug); const done=progress.includes(discovery.slug);
  useEffect(()=>{recordMetric("discovery_view");},[discovery.slug]);
  function toggleSaved(){const updated=saved?savedItems.filter(x=>x!==discovery.slug):[...savedItems,discovery.slug];writeStoredStringList("living-tamil-saved",updated);if(!saved)recordMetric("discovery_save");}
  function complete(){if(done)return;const updated=[...progress,discovery.slug];writeStoredStringList("living-tamil-progress",updated);recordMetric("discovery_complete");if(journey.every(item=>updated.includes(item.slug)))recordMetric("journey_complete");}
  async function share(){if(navigator.share)await navigator.share({title:discovery.title,url:location.href});else{await navigator.clipboard.writeText(location.href);setCopied(true);setTimeout(()=>setCopied(false),1500)}recordMetric("discovery_share");}
  const reading=mode==="original"?discovery.original:mode==="simple"?discovery.simple:discovery.english;
  return <div className="site-shell"><Header/><main className="reader-shell">
    <aside className="reader-rail"><Link href="/"><ArrowLeft size={16}/> All journeys</Link><p className="eyebrow">{discovery.journeyTitle}</p><h2>{index+1} of {journey.length}</h2>{journey.map((item,i)=><Link className={item.slug===discovery.slug?"current":""} href={`/discover/${item.slug}`} key={item.slug}><span>{i+1}</span>{item.tamilTitle}</Link>)}</aside>
    <article className="reader-card">
      <div className={`reader-hero art-${discovery.accent}`}><div><p>{discovery.category} · {discovery.duration} min</p><span>{discovery.tamilTitle}</span><h1>{discovery.title}</h1></div><div className="reader-actions"><button onClick={toggleSaved} aria-label="Bookmark"><Bookmark fill={saved?"currentColor":"none"}/></button><button onClick={share} aria-label="Share">{copied?<Check/>:<Share2/>}</button></div></div>
      <section className="reader-content"><p className="hook">{discovery.hook}</p><div className="mode-tabs">{modes.map(item=><button className={mode===item?"active":""} onClick={()=>setMode(item)} key={item}>{item==="original"?"மூலம்":item==="simple"?"எளிய தமிழ்":"English"}</button>)}</div><div className="reading" lang={mode==="english"?"en":"ta"}>{reading}</div>
        <div className="context-grid"><div><small>Why it matters</small><h2>Read the world around the words.</h2><p>{discovery.context}</p></div><div><small>Connection to today</small><h2>The idea is still alive.</h2><p>{discovery.today}</p></div></div>
        <details className="provenance">
          <summary><BookOpen size={18}/><span><strong>Sources & editorial notes</strong><small>Optional · provenance and rights</small></span></summary>
          <div className="provenance-body">
            <p>The complete learning experience is provided above. This reference is included for transparency, attribution, and deeper verification.</p>
            <dl>
              <div><dt>Primary collection</dt><dd>{discovery.sourceTitle}</dd></div>
              <div><dt>Reuse status</dt><dd>{discovery.license}</dd></div>
              <div><dt>Editorial status</dt><dd>{discovery.reviewStatus.replaceAll("-"," ")}</dd></div>
            </dl>
            <a href={discovery.sourceUrl} target="_blank" rel="noreferrer">Inspect the original source <ExternalLink size={13}/></a>
          </div>
        </details>
        <CorrectionLink item={`Discovery ${discovery.slug} — ${discovery.title}`}/>
        <button className={`complete-button ${done?"done":""}`} onClick={complete}>{done?<Check size={18}/>:null}{done?"Discovery completed":"Mark complete"}</button>
      </section>
    </article>
    <nav className="reader-nav">{previous?<Link href={`/discover/${previous.slug}`}><ArrowLeft/> <span><small>Previous</small>{previous.title}</span></Link>:<span/>}{next?<Link href={`/discover/${next.slug}`} onClick={()=>recordMetric("journey_continue")}><span><small>Next</small>{next.title}</span><ArrowRight/></Link>:<Link href="/"><span><small>Journey complete</small>Explore another journey</span><ArrowRight/></Link>}</nav>
  </main></div>;
}
