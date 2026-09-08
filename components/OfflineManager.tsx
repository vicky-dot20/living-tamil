"use client";

import { Download, RefreshCw, Trash2, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Discovery } from "@/lib/content";

const CACHE = "living-tamil-reading-v1";
export default function OfflineManager({ discoveries }: { discoveries: Discovery[] }) {
  const [cached, setCached] = useState<string[]>([]); const [status, setStatus] = useState("Checking this device…");
  async function refresh(){if (!("caches" in window)){setStatus("Offline storage is not supported in this browser.");return;}const cache=await caches.open(CACHE);const keys=await cache.keys();setCached(keys.map((request)=>new URL(request.url).pathname));setStatus(`${keys.length} discoveries available offline.`);}
  useEffect(()=>{if (!("caches" in window)) return; caches.open(CACHE).then((cache)=>cache.keys()).then((keys)=>{setCached(keys.map((request)=>new URL(request.url).pathname));setStatus(`${keys.length} discoveries available offline.`);});},[]);
  async function saveAll(){const cache=await caches.open(CACHE);setStatus("Saving the complete discovery collection…");await cache.addAll(discoveries.map((item)=>`/discover/${item.slug}`));await refresh();}
  async function clear(){if(!confirm("Remove downloaded Living Tamil discoveries from this device?"))return;await caches.delete(CACHE);await refresh();setStatus("Offline collection removed.");}
  return <main className="offline-manager"><p className="eyebrow"><WifiOff size={14}/> Offline collection</p><h1>Take the journeys with you.</h1><p>Download every editorial discovery to this browser. API-powered Thirukkural and Wikisource search still need a connection unless previously opened.</p><div className="offline-summary"><strong>{cached.length}</strong><span>of {discoveries.length} discoveries downloaded</span></div><div className="offline-actions"><button onClick={saveAll}><Download size={16}/> Download or update all</button><button onClick={()=>void refresh()}><RefreshCw size={16}/> Check status</button><button disabled={!cached.length} onClick={clear}><Trash2 size={16}/> Remove downloads</button></div><p role="status" aria-live="polite">{status}</p><section>{discoveries.map((item)=><Link className={cached.includes(`/discover/${item.slug}`)?"cached":""} href={`/discover/${item.slug}`} key={item.slug}><span>{cached.includes(`/discover/${item.slug}`)?"Downloaded":"Online only"}</span><strong>{item.title}</strong></Link>)}</section><Link className="offline-back" href="/">Back to journeys</Link></main>;
}
