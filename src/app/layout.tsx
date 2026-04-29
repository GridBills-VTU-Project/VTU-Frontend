import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css"
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { Suspense } from "react";
const inter = Inter({
  preload: true,
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});
export const metadata: Metadata = {
  title: "GridBills VTU",
  description:
    "Buy cheap airtime, data bundles, electricity tokens, WAEC & JAMB pins online in Nigeria. Instant delivery, 24/7 service. The fastest VTU platform in Nigeria.",
  icons: {
    icon: "/logo.png",
  },
  keywords: [
    "buy airtime online",
    "buy MTN airtime online",
    "buy Glo airtime online",
    "buy Airtel airtime online",
    "buy 9mobile airtime online",
    "buy cheap data online",
    "buy MTN data bundle online",
    "buy Glo data bundle",
    "cheapest data plans in Nigeria",
    "pay electricity bill online Nigeria",
    "buy DSTV subscription online",
    "buy WAEC scratch card online",
    "buy NECO pin online",
    "buy JAMB pin online",
    "buy exam pins online Nigeria",
    "recharge card pins online",
    "virtual top up Nigeria",
    "VTU platform Nigeria",
  ],
  // keywords: ['Buy airtime', "airtime", "Buy data", "data", , 'keywords', 'here'],
  authors: [{ name: "Your Name", url: "https://gridbills.com/" }],
  metadataBase: new URL("https://gridbills.com/"), // REQUIRED for absolute OG URLs
  creator: "Your Name",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="font-inter antialiased">
        {" "}
        {/* antialiased for smoother rendering */}
        <ToastContainer position="top-right" hideProgressBar theme="colored" />
        <ReactQueryProvider>
          <Suspense>
            <Header />
          </Suspense>
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
