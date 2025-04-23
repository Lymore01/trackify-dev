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
    // <SidebarProvider
    // >
    //   <AppSideBar
    //     items={[
    //       {
    //         title: "Dashboard",
    //         url: "/dashboard",
    //         icon: <Home />,
    //       },
    //     ]}
    //   />
    //   <div className="flex flex-col flex-1 h-screen">
    //     <div className="flex items-center justify-between p-2">
    //       <SidebarTrigger />
    //     </div>

    //     <Separator />

    //     <div className="flex-1 overflow-y-auto md:overflow-hidden">
    //       {children}
    //     </div>
    //   </div>
    // </SidebarProvider>

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
