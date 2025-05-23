import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { useEffect, useState } from "react";

interface SidebarContextProps {
  user: {
    name: string;
    plan: string;
  };
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useCustomSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useCustomSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false); //colapsible
  const [openMobile, setOpenMobile] = React.useState(false);
  const user = useAuth();

  // prevent re-renders
  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      user,
      isMobile,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
    }),
    [isMobile, open, openMobile]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export { useCustomSidebar, SidebarProvider, SidebarContext };
