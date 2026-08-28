import type { Metadata } from "next";
import LocalInsights from "@/components/LocalInsights";

export const metadata: Metadata = { title: "Local insights — Living Tamil", description: "Inspect privacy-conscious MVP activity stored in this browser." };

export default function InsightsPage() { return <LocalInsights/>; }
