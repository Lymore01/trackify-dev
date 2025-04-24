import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import AppSideBar from "@/components/app-sidebar";
import { Home } from "lucide-react";
import CustomSidebar from "@/components/custom-sidebar";
import TopNav from "@/components/top-nav";

export const metadata: Metadata = {
  title: "Trackify | Dashboard",
  description: "User Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex overflow-y-auto md:overflow-hidden">
      <CustomSidebar />
      <div className="w-full">
        <div className="flex w-[60%] mx-auto py-2">
          <TopNav />
        </div>
        {children}
      </div>
    </div>
  );
}
