import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DiscoveryReader from "@/components/DiscoveryReader";
import { getDiscoveries, getDiscovery } from "@/lib/content";

export function generateStaticParams() { return getDiscoveries().map(({ slug }) => ({ slug })); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;const discovery=getDiscovery(slug);if(!discovery)return{title:"Discovery not found"};return{title:discovery.title,description:discovery.summary,alternates:{canonical:`/discover/${slug}`},openGraph:{title:discovery.title,description:discovery.summary,url:`/discover/${slug}`,type:"article"}}}

export default async function DiscoveryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const discovery = getDiscovery(slug);
  if (!discovery) notFound();
  return <DiscoveryReader discovery={discovery} journey={getDiscoveries().filter((item) => item.journey === discovery.journey)} />;
}
