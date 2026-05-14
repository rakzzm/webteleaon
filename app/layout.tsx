import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://teleaon.ai"),
  title: {
    default: "Teleaon AI | Enterprise AI Video Agents and Infrastructure",
    template: "%s | Teleaon AI"
  },
  description:
    "Build, deploy, and scale intelligent AI systems with secure agentic applications, AI infrastructure, and enterprise generative AI.",
  icons: {
    icon: [
      { url: "/icons/teleaon-favicon.ico", sizes: "256x256", type: "image/x-icon" },
      { url: "/icons/teleaon-favicon.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icons/teleaon-favicon.ico"]
  },
  openGraph: {
    title: "Teleaon AI",
    description: "Enterprise AI platform, infrastructure, SaaS applications, and agentic automation.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
