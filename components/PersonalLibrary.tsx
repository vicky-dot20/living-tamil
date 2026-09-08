"use client";

import { Bookmark, Clock3 } from "lucide-react";
import Link from "next/link";
import type { Discovery } from "@/lib/content";
import { useStoredStringList } from "@/lib/local-state";

export default function PersonalLibrary({ discoveries }: { discoveries: Discovery[] }) {
  const saved = useStoredStringList("living-tamil-saved");
  const recent = useStoredStringList("living-tamil-recent");
  const resolve = (slugs: string[]) => slugs.map((slug) => discoveries.find((item) => item.slug === slug)).filter((item): item is Discovery => Boolean(item));
  const groups = [{ title: "Saved collection", icon: Bookmark, items: resolve(saved) }, { title: "Recently read", icon: Clock3, items: resolve(recent) }];
  if (!groups.some((group) => group.items.length)) return null;
  return <section className="personal-library" aria-labelledby="personal-library-heading"><p className="eyebrow" id="personal-library-heading">Your library · stored only on this device</p><div>{groups.map(({ title, icon: Icon, items }) => <article key={title}><h2><Icon size={16}/>{title}<small>{items.length}</small></h2>{items.length ? <nav>{items.map((item) => <Link key={item.slug} href={`/discover/${item.slug}`}><span lang="ta">{item.tamilTitle}</span><strong>{item.title}</strong></Link>)}</nav> : <p>Nothing here yet.</p>}</article>)}</div></section>;
}
