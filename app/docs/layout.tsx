import { Metadata } from "next";
import { NavBar } from "@/components/landing/navbar";
import { DocsProvider } from "@/contexts/useDocs";
import { Sidebar } from "@/components/docs/sidebar";
import { Breadcrumbs } from "@/components/docs/breadcrumb";
import { Progress } from "@/components/docs/progress";
import { Footer } from "@/components/docs/footer";
import { ScrollToTopOnPathChange } from "@/components/scrollToTop";
import MobileSheet from "@/components/docs/mobile-sheet";
import SearchDialog from "@/components/search-dialog";

export const metadata: Metadata = {
  title: "Trackify | Docs",
  description: "Documentation for Trackify",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsProvider>
      <ScrollToTopOnPathChange />
      <div className="flex flex-col min-h-screen bg-background">
        <NavBar />

        <div className="flex-1 mt-24 lg:mt-32 max-w-7xl mx-auto w-[95%] lg:w-[85%] mb-12">
          <div className="lg:hidden py-4 flex items-center justify-between gap-4 border-b border-dashed mb-6">
            <MobileSheet />
            <SearchDialog />
          </div>

          <div className="grid grid-cols-12 gap-8 lg:gap-12 min-h-[calc(100vh-12rem)]">
            <aside className="hidden lg:block lg:col-span-3 border-r border-dashed pr-8 scrollbar-hide sticky top-32 h-[calc(100vh-10rem)] overflow-y-auto">
              <div className="flex flex-col gap-4">
                <SearchDialog />
                <Sidebar className="border-none p-0 h-auto" />
              </div>
            </aside>

            <main className="col-span-12 lg:col-span-6 min-w-0">
              <div className="flex flex-col gap-4 max-w-3xl">
                <Breadcrumbs />
                <div className="min-h-[calc(100vh-24rem)]">{children}</div>
                <Footer />
              </div>
            </main>

            <aside className="hidden lg:block lg:col-span-3 border-l border-dashed pl-8 sticky top-32 h-[calc(100vh-10rem)] overflow-y-auto">
              <Progress />
            </aside>
          </div>
        </div>
      </div>
    </DocsProvider>
  );
}
