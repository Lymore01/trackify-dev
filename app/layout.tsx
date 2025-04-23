import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import "./globals.css";
import CustomSidebar from "@/components/custom-sidebar";
import TopNav from "@/components/top-nav";

const lexend = localFont({
  src: [
    {
      path: "./fonts/Lexend/Lexend-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/Lexend/Lexend-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Trackify",
  description: "Track your links with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.className} antialiased font-sans flex`}>
        <div className="w-full">{children}</div>
        <Toaster richColors />
      </body>
    </html>
  );
}
