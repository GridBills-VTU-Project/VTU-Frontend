import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});
export const metadata: Metadata = {
  title: "My VTU Website",
  description: "Buy airtime, data, pay bills and more",
  icons:{
    icon:"/logo.png"}
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
