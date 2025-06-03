"use client";

import { usePathname } from "next/navigation";
import CustomSidebar, { Logo } from "@/components/custom-sidebar";
import TopNav from "@/components/top-nav";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Edit,
  Edit2,
  Menu,
  PanelLeftIcon,
  UserCircle,
  UserCogIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { SidebarProvider } from "@/contexts/useSidebar";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Tag from "./tag";
import ProfileInfoCard from "./profile-info-card";
import ProfileModal from "./modals/profile";
import { ModeToggle } from "./mode-toggle";

const pathsWithTopNav = ["/dashboard/links"];

export function ProfileTrigger({
  setProfileOpen,
}: {
  setProfileOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex items-center flex-row-reverse gap-2 mt-4">
      <Image
        src={"/images/profile.jpg"}
        alt={"profile picture"}
        width={28}
        height={28}
        className="rounded-full object-cover size-8 border-2 border-indigo-200 cursor-pointer"
        onClick={() => {
          setProfileOpen(true);
        }}
      />
      <ModeToggle />
    </div>
  );
}

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showTopNav = pathsWithTopNav.some((path) => pathname.startsWith(path));
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleOpenMenu = () => {
    setOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col lg:flex-row overflow-y-auto md:overflow-hidden relative">
        <div className="hidden lg:flex">
          <CustomSidebar />
        </div>
        <div className="sticky top-0 left-0 w-full p-2 justify-between items-center border-1 border-b-slate-400 flex lg:hidden">
          <div className="flex gap-2 items-center">
            <Menu onClick={handleOpenMenu} />
            <Logo />
          </div>
          <ProfileTrigger setProfileOpen={setProfileOpen} />
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
              <motion.div layout className="top-0 left-[100%] absolute">
                <div
                  className="grid place-content-center p-2 bg-gray-100"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <PanelLeftIcon />
                </div>
              </motion.div>
            </CustomSidebar>
          </motion.div>
        )}
        <div className="w-full relative">
          <div className="fixed top-0 w-full h-[40px] hidden lg:flex items-center justify-end px-4">
            <ProfileTrigger setProfileOpen={setProfileOpen} />
          </div>

          {profileOpen && (
            <ProfileModal open={profileOpen} openChange={setProfileOpen} />
          )}

          {showTopNav && (
            <div className="flex w-[100%] lg:w-[60%] mx-auto py-2 px-2 lg:p-0">
              <TopNav />
            </div>
          )}
          {/* mt-12 */}
          <div className="mt-0 lg:mt-12">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
