"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface DocsContextType {
    currentPath: string;
}

const DocsContext = React.createContext<DocsContextType | null>(null);

function useDocs() {
  const context = React.useContext(DocsContext);

  if (!context) {
    throw new Error("useDocs must be used within a DocsProvider.");
  }

  return context;
}

function DocsProvider({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const contextValue = React.useMemo<DocsContextType>(
    () => ({
      currentPath,
    }),
    [currentPath]
  );

  return (
    <DocsContext.Provider value={contextValue}>{children}</DocsContext.Provider>
  );
}

export { useDocs, DocsProvider, DocsContext };
