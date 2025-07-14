import type { Metadata } from "next";

import React from "react";

import BuilderPage from "@/app/builder/builder";

export const metadata: Metadata = {
  title: "Build Your Custom PC – PCMate",
  description:
    "Choose your budget, location, and usage type — PCMate will suggest the perfect custom PC build for you, optimized for performance and price.",
  keywords: [
    "custom PC builder",
    "budget PC build",
    "gaming PC Bangladesh",
    "best PC under budget",
    "PC configuration",
    "build your own PC",
    "AI PC recommendation",
    "computer builder",
    "pc build tool",
    "PCMate",
  ],
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Build Your Custom PC – PCMate",
    description:
      "Smart PC builder that gives you the best build for your needs, whether for gaming, editing, or everyday use.",
    url: "https://yourdomain.com/builder",
    siteName: "PCMate",
    images: [
      {
        url: "https://yourdomain.com/images/builder-preview.png",
        width: 1200,
        height: 630,
        alt: "PC Builder Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build the Best PC with PCMate",
    description:
      "Tell us what you need — we’ll create the perfect PC build for your budget and location.",
    images: ["https://yourdomain.com/images/builder-preview.png"],
    creator: "@yourTwitterHandle",
  },
  authors: [{ name: "Md Razu Islam", url: "https://razuislam.vercel.app/" }],
  creator: "PCMate Team",
  publisher: "PCMate",
  category: "technology",
};

function Page() {
  return (
    <BuilderPage />
  );
}

export default Page;
