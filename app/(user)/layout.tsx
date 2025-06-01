
import { Metadata } from "next";
import LayoutShell from "@/components/layout-shell";

export const metadata: Metadata = {
  title: "Trackify | Dashboard",
  description: "User Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutShell>{children}</LayoutShell>;
}
