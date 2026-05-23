import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import Topbar from "@/shared/components/organisms/Topbar/Topbar.component";
import Providers from "./provider";
import { ToastContainer } from "@/shared/components/organisms/ToastContainer/ToastContainer";
import PageAnimations from "@/shared/layout/PageAnimation";
import CsrfLoader from "@/shared/lib/csrf/csrf-loaded";
import AuthBootstrap from "@/shared/bootstrap/AuthBootsrap.tsx/AuthBootstrap";
import AppIntro from "@/shared/components/organisms/AppIntro/App.component";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BidNepal - Your Ultimate Bidding Platform",
  description: "BidNepal is your go-to platform for seamless bidding experiences. Whether you're a buyer looking for the best deals or a seller aiming to reach a wider audience, BidNepal has you covered. Join our community today and start bidding with confidence!",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html
      lang="en"
      className={`bg-primarybg ${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <AuthBootstrap />
          <CsrfLoader />
          <ToastContainer />
          <Topbar />
          <AppIntro />
            {children}
        </Providers>
      </body>
    </html>
  );
}
