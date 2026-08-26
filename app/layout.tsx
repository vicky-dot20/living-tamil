import type { Metadata } from "next";
import "./globals.css";
import "./mvp.css";

export const metadata: Metadata = {
  title: "Living Tamil — Discover Tamil every day",
  description: "Guided five-minute journeys through Tamil language, literature, history and culture.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
