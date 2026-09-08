import { AlertTriangle, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { Discovery } from "@/lib/content";

function isReviewed(item: Discovery) { return item.review.status === "reviewed" && Boolean(item.review.reviewer && item.review.reviewedAt && item.review.scope); }

export default function EditorialDashboard({ discoveries }: { discoveries: Discovery[] }) {
  const reviewed = discoveries.filter(isReviewed).length;
  const sourced = discoveries.filter((item) => /^https:\/\//.test(item.sourceUrl)).length;
  const rightsPending = discoveries.filter((item) => /pending|unknown|unclear/i.test(item.license)).length;
  return <main className="editorial-dashboard"><p className="eyebrow"><ShieldCheck size={14}/> Maintainer transparency</p><h1>Content and provenance status</h1><p>This public dashboard reports repository metadata only. A source link proves origin, not scholarly review or reuse permission.</p><section className="editorial-stats"><article><strong>{discoveries.length}</strong><span>Discoveries</span></article><article><strong>{reviewed}</strong><span>Fully reviewed</span></article><article><strong>{sourced}</strong><span>Direct source URLs</span></article><article><strong>{rightsPending}</strong><span>Rights needing action</span></article></section><div className="editorial-table" role="region" aria-label="Editorial records" tabIndex={0}><table><thead><tr><th>Discovery</th><th>Review</th><th>Reviewer evidence</th><th>Rights</th><th>Source</th></tr></thead><tbody>{discoveries.map((item)=><tr key={item.slug}><td><Link href={`/discover/${item.slug}`}>{item.title}</Link><small>{item.journeyTitle}</small></td><td><span className={isReviewed(item)?"status-reviewed":"status-pending"}>{isReviewed(item)?<CheckCircle2/>:<AlertTriangle/>}{item.review.status.replaceAll("-"," ")}</span></td><td>{item.review.reviewer ? <><strong>{item.review.reviewer}</strong><small>{item.review.reviewedAt} · {item.review.scope}</small></> : <span>Not yet recorded</span>}</td><td>{item.license}</td><td><a href={item.sourceUrl} target="_blank" rel="noreferrer">Open <ExternalLink size={12}/></a></td></tr>)}</tbody></table></div><p className="editorial-note">Contributors: update the Markdown record through an issue and pull request. Never add a reviewer identity without that person&apos;s approval.</p></main>;
}
