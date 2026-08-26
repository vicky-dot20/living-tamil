import type { Metadata } from "next";
import KuralLibrary from "@/components/KuralLibrary";

export const metadata: Metadata = { title: "Thirukkural Library — Living Tamil", description: "Browse and search all 1,330 Kurals by Paal and Athikaaram." };

export default function KuralPage() { return <KuralLibrary />; }
