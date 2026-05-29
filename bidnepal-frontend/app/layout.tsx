import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import Topbar from "@/shared/components/ui/organisms/Topbar/Topbar.component";
import Providers from "./provider";
import { ToastContainer } from "@/shared/components/ui/organisms/ToastContainer/ToastContainer";
import PageAnimations from "@/shared/components/layout/PageAnimation";
import CsrfBootstrap from "@/shared/bootstrap/CsrfBootstrap/CsrfBootstrap";
import AuthBootstrap from "@/shared/bootstrap/AuthBootstrap/AuthBootstrap";
import AppIntro from "@/shared/components/ui/organisms/AppIntro/App.component";
import BoneyardProvider from "@/bones/BoneyardProvider";

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
          <CsrfBootstrap />
          <ToastContainer />
          <AuthBootstrap>
            <BoneyardProvider>
              <Topbar />
              {/* <AppIntro /> */}

              {children}
            </BoneyardProvider>
          </AuthBootstrap>
        </Providers>
      </body>
    </html>
  );
}
