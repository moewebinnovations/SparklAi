import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SparklAi - A Cutting-edge AI Content Generator",
  description: "SparklAi - A Cutting-edge AI Content Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta property="og:title" content="SparklAi - A Cutting-edge AI Content Generator" />
          <meta property="og:description" content="SparklAi makes it easy to create high-quality content in seconds. Enhance your productivity with our cutting-edge AI technology." />
          <meta property="og:url" content="https://sparkl-ai.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://i.ibb.co/H7hDFvW/Sparkl-AI-1.png" />
          <meta property="og:image:alt" content="SparklAi Screenshot" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="SparklAi - A Cutting-edge AI Content Generator" />
          <meta name="twitter:description" content="SparklAi makes it easy to create high-quality content in seconds. Enhance your productivity with our cutting-edge AI technology." />
          <meta name="twitter:image" content="https://i.ibb.co/H7hDFvW/Sparkl-AI-1.png" />
          <meta name="twitter:image:alt" content="SparklAi Screenshot" />
          <script src="//code.tidio.co/t2ykck2q55satrmdc4zq22dtbrvj6xgh.js" async></script>
        </head>
        <body className={outfit.className}>
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
