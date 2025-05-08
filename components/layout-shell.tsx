"use client";

import { usePathname } from "next/navigation";
import CustomSidebar, { Logo } from "@/components/custom-sidebar";
import TopNav from "@/components/top-nav";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const pathsWithTopNav = ["/dashboard/links"];

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showTopNav = pathsWithTopNav.some((path) => pathname.startsWith(path));
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleOpenMenu = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row overflow-y-auto md:overflow-hidden relative">
      <div className="hidden lg:flex">
        <CustomSidebar />
      </div>
      <div className="sticky top-0 left-0 w-full p-2 justify-between items-center border-1 border-b-slate-400 flex lg:hidden">
        <div className="flex gap-2 items-center">
          <Menu onClick={handleOpenMenu} />
          <Logo />
        </div>
      </div>
      {/* mobile menu */}
      {open && (
        <motion.div
          layout
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{ delay: 0.125 }}
          className="block lg:hidden"
        >
          <CustomSidebar>
            <motion.div layout className="top-0 right-[-50%] absolute">
              <div
                className="grid place-content-center p-2 bg-gray-100"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <X />
              </div>
            </motion.div>
          </CustomSidebar>
        </motion.div>
      )}
      <div className="w-full">
        {showTopNav && (
          <div className="flex w-[100%] lg:w-[60%] mx-auto py-2 px-2 lg:p-0">
            <TopNav />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
