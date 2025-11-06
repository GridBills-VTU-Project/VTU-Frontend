import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
  title: "My VTU Website",
  description: "Buy airtime, data, pay bills and more",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
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
