"use client";

import { ArrowRight, BookOpen, Check, Clock, Compass, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Discovery } from "@/lib/content";

type Journey = { slug: string; title: string; category: string; accent: string; items: Discovery[] };

export default function HomeExperience({ discoveries, journeys }: { discoveries: Discovery[]; journeys: Journey[] }) {
  const [query, setQuery] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => { setCompleted(JSON.parse(localStorage.getItem("living-tamil-progress") || "[]")); }, []);
  const filtered = useMemo(() => discoveries.filter((item) => `${item.title} ${item.tamilTitle} ${item.category} ${item.summary}`.toLowerCase().includes(query.toLowerCase())), [discoveries, query]);
  const first = discoveries.find((item) => !completed.includes(item.slug)) || discoveries[0];

  return <div className="site-shell">
    <Header />
    <main className="home">
      <section className="home-hero">
        <div><p className="eyebrow"><Sparkles size={13}/> A living library, one journey at a time</p><h1>Discover the Tamil you inherited.</h1><p>Short, source-grounded journeys through literature, language, places and ideas—made understandable in original Tamil, simple Tamil and English.</p></div>
        <div className="hero-stat"><strong>{discoveries.length}</strong><span>reviewable discoveries</span><strong>{journeys.length}</strong><span>starter journeys</span></div>
      </section>

      <section className="continue-card">
        <div className={`art art-${first.accent}`}><span>{first.tamilTitle}</span><small>{first.category}</small></div>
        <div><p className="eyebrow">Continue your journey · {first.duration} min</p><h2>{first.title}</h2><p>{first.summary}</p><Link href={`/discover/${first.slug}`}>Open discovery <ArrowRight size={17}/></Link></div>
      </section>

      <section className="section-head"><div><p className="eyebrow"><Compass size={13}/> Guided journeys</p><h2>Follow an idea, not a random feed.</h2></div></section>
      <section className="journey-grid">
        {journeys.map((journey) => {
          const count = journey.items.filter((item) => completed.includes(item.slug)).length;
          return <article className="journey-card" key={journey.slug}>
            <div className={`journey-cover art-${journey.accent}`}><small>{journey.category}</small><strong>{journey.items[0].tamilTitle}</strong></div>
            <div className="journey-body"><span>{journey.items.length} discoveries</span><h3>{journey.title}</h3><p>{journey.items[0].summary}</p><div className="journey-progress"><i style={{width:`${(count/journey.items.length)*100}%`}}/></div><Link href={`/discover/${journey.items[Math.min(count, journey.items.length-1)].slug}`}>{count ? "Continue" : "Start journey"} <ArrowRight size={15}/></Link></div>
          </article>;
        })}
      </section>

      <section className="library-head"><div><p className="eyebrow"><BookOpen size={13}/> Explore the corpus</p><h2>All discoveries</h2></div><label><Search size={16}/><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search words, places, poems…"/></label></section>
      <section className="library-grid">
        {filtered.map((item) => <Link className="library-card" href={`/discover/${item.slug}`} key={item.slug}><div className={`library-icon art-${item.accent}`}>{completed.includes(item.slug)?<Check size={18}/>:item.tamilTitle.slice(0,2)}</div><div><small>{item.category} · {item.duration} min</small><h3>{item.title}</h3><p>{item.summary}</p></div><ArrowRight size={17}/></Link>)}
      </section>
    </main>
  </div>;
}

export function Header() { return <header className="topbar"><Link className="brand" href="/"><span>ழ</span><div><strong>Living Tamil</strong><small>தமிழை தினமும் கண்டறியுங்கள்</small></div></Link><nav><Link href="/">Journeys</Link><a href="#library">Library</a></nav></header>; }
