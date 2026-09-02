import type { Metadata } from "next";
import "./globals.css";
import "./mvp.css";
import PwaRegistration from "@/components/PwaRegistration";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4050"),
  title: { default: "Living Tamil — Discover Tamil every day", template: "%s | Living Tamil" },
  description: "Guided five-minute journeys through Tamil language, literature, history and culture.",
  applicationName: "Living Tamil",
  manifest: "/manifest.webmanifest",
  openGraph: { title: "Living Tamil", description: "Discover the Tamil you inherited through guided, source-grounded journeys.", type: "website", url: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<PwaRegistration/></body>
    </html>
  );
}
