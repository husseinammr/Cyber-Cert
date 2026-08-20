import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/app-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CyberCert Hub — Cybersecurity Certification & Career Navigator",
  description:
    "A free, permanent guide to cybersecurity certifications, career paths, and roadmaps for beginners through professionals. No login required.",
  keywords: ["cybersecurity", "certifications", "career paths", "roadmaps", "OSCP", "CISSP", "Security+", "SOC analyst"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <body className="min-h-screen bg-cyber-bg bg-grid-overlay bg-grid antialiased">
        <AppProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
