import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://reqview.dev"),
  title: "ReqView — Requirement-Aware Code Review",
  description:
    "Evaluate code against original requirements and specifications. Detect missing functionality, edge-case mismatches, and behavioral discrepancies before merging.",
  keywords: [
    "AI code review",
    "requirement verification",
    "spec compliance",
    "pull request review",
    "software architecture",
    "developer tools",
  ],
  authors: [{ name: "ReqView Team" }],
  openGraph: {
    title: "ReqView — Requirement-Aware Code Review",
    description:
      "Traditional code review checks syntax and bugs. ReqView checks if your code actually satisfies the original specifications.",
    url: "https://reqview.dev",
    siteName: "ReqView",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "ReqView Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReqView — Requirement-Aware Code Review",
    description:
      "Traditional code review checks syntax and bugs. ReqView checks if your code actually satisfies the original specifications.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#08090B" />
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased selection:bg-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

