import type { Metadata } from "next";
import EditorialDashboard from "@/components/EditorialDashboard";
import { Header } from "@/components/HomeExperience";
import { getDiscoveries } from "@/lib/content";
export const metadata: Metadata = { title: "Editorial status", description: "Public review, provenance, and rights status for Living Tamil content.", alternates: { canonical: "/editorial" } };
export default function EditorialPage(){return <div className="site-shell"><Header/><EditorialDashboard discoveries={getDiscoveries()}/></div>}
