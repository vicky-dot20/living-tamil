import { notFound } from "next/navigation";
import DiscoveryReader from "@/components/DiscoveryReader";
import { getDiscoveries, getDiscovery } from "@/lib/content";

export function generateStaticParams() { return getDiscoveries().map(({ slug }) => ({ slug })); }

export default async function DiscoveryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const discovery = getDiscovery(slug);
  if (!discovery) notFound();
  return <DiscoveryReader discovery={discovery} journey={getDiscoveries().filter((item) => item.journey === discovery.journey)} />;
}
