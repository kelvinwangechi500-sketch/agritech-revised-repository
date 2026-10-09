import type { Metadata, Viewport } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { ToastProvider } from "@/components/ui/Toast";

export const viewport: Viewport = {
  themeColor: "#16a34a",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://agritechsolutions.co.ke"),
  title: {
    default: "AgriTech Solutions – Livestock, Feeds & Vet Services in Kenya",
    template: "%s | AgriTech Solutions Kenya",
  },
  description:
    "Kenya's premium agricultural store by AgriTech Solutions. Buy quality livestock, find professional vet services, and order premium animal feeds. Guaranteed quality, direct to you. Call 0768 464 997.",
  keywords: [
    "livestock for sale Kenya", "animal feeds Kenya", "vet services near me Kenya",
    "cows for sale Meru", "dairy cattle Kenya", "poultry feed Kenya",
    "veterinary services Kenya", "AgriTech Solutions Kenya",
    "agribusiness Kenya", "farm store Kenya",
  ],
  authors: [{ name: "AgriTech Solutions", url: "https://agritechsolutions.co.ke" }],
  creator: "AgriTech Solutions Kenya",
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "AgriTech Solutions",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AgriTech Solutions Kenya" }],
  },
  twitter: { card: "summary_large_image", site: "@AgriTechKE" },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content="Meru, Kenya" />
      </head>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
