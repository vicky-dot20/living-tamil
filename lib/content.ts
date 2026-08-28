import "server-only";

import fs from "node:fs";
import path from "node:path";

export type Discovery = {
  slug: string; title: string; tamilTitle: string; journey: string; journeyTitle: string;
  order: number; duration: number; category: string; accent: string; summary: string;
  hook: string; original: string; simple: string; english: string; context: string; today: string;
  sourceTitle: string; sourceUrl: string; license: string; reviewStatus: string;
};

const contentDirectory = path.join(process.cwd(), "content", "discoveries");

function parseMarkdown(source: string): Omit<Discovery, "slug"> {
  const [, rawMeta = "", body = ""] = source.split(/^---\s*$/m);
  const meta = Object.fromEntries(rawMeta.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const colon = line.indexOf(":");
    return [line.slice(0, colon).trim(), line.slice(colon + 1).trim().replace(/^"|"$/g, "")];
  }));
  const sections: Record<string, string> = {};
  let current = "";
  for (const line of body.trim().split("\n")) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) { current = heading[1].trim().toLowerCase(); sections[current] = ""; }
    else if (current) sections[current] = `${sections[current]}${line}\n`;
  }
  const clean = (value = "") => value.trim();
  return {
    title: meta.title, tamilTitle: meta.tamilTitle, journey: meta.journey, journeyTitle: meta.journeyTitle,
    order: Number(meta.order), duration: Number(meta.duration || 5), category: meta.category,
    accent: meta.accent || "forest", summary: meta.summary, hook: clean(sections.hook),
    original: clean(sections.original), simple: clean(sections.simple), english: clean(sections.english),
    context: clean(sections.context), today: clean(sections.today), sourceTitle: meta.sourceTitle,
    sourceUrl: meta.sourceUrl, license: meta.license, reviewStatus: meta.reviewStatus || "editorial-review",
  };
}

export function getDiscoveries(): Discovery[] {
  return fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".md")).map((file) => ({
    slug: file.replace(/\.md$/, ""), ...parseMarkdown(fs.readFileSync(path.join(contentDirectory, file), "utf8")),
  })).sort((a, b) => a.journey.localeCompare(b.journey) || a.order - b.order);
}

export function getDiscovery(slug: string) { return getDiscoveries().find((item) => item.slug === slug); }

export function getJourneys() {
  const discoveries = getDiscoveries();
  return Array.from(new Set(discoveries.map((item) => item.journey))).map((slug) => {
    const items = discoveries.filter((item) => item.journey === slug);
    return { slug, title: items[0].journeyTitle, category: items[0].category, accent: items[0].accent, items };
  });
}
