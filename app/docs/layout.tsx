import { Metadata } from "next";
import { NavBar } from "../page";
import { DocsProvider } from "@/contexts/useDocs";
import { Sidebar } from "@/components/docs/sidebar";
import { Breadcrumbs } from "@/components/docs/breadcrumb";
import { Progress } from "@/components/docs/progress";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/docs/footer";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { ScrollToTopOnPathChange } from "@/components/scrollToTop";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSheet from "@/components/docs/mobile-sheet";

export const metadata: Metadata = {
  title: "Trackify | Docs",
  description: "Documentation for Trackify",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsProvider>
      <ScrollToTopOnPathChange />
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-1 mt-16">
          <div className="lg:hidden p-4 items-center border-b border-dashed bg-background flex justify-between">
            <MobileSheet />
          </div>
          <main className="grid grid-cols-12 gap-4 h-[calc(100vh-4rem)] overflow-hidden">
            <Sidebar className="hidden lg:block"/>
            {/* Main content */}
            <div className="col-span-12 lg:col-span-6 bg-background p-6 h-full overflow-y-auto">
              <div className="flex flex-col h-full gap-4">
                <Breadcrumbs />
                <div className="mt-4">
                  {children}
                  <Footer />
                </div>
              </div>
            </div>
            <Progress />
          </main>
        </div>
      </div>
    </DocsProvider>
  );
}
