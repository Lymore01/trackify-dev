import { Metadata } from "next";
import LayoutShell from "@/components/layout-shell";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Trackify | Dashboard",
  description: "User Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <LayoutShell>{children}</LayoutShell>
    </Suspense>
  );
}
