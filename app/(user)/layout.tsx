import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import AppSideBar from "@/components/app-sidebar";
import { Home } from "lucide-react";

export const metadata: Metadata = {
  title: "DocX | Dashboard",
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

    <div className="flex-1 overflow-y-auto md:overflow-hidden">{children}</div>
  );
}
