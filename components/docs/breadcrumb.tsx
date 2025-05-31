"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useDocs } from "@/contexts/useDocs";
import { useContext } from "react";

export const Breadcrumbs = () => {
  const { currentPath } = useDocs();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={
              currentPath === "/docs/getting-started"
                ? "/docs/getting-started"
                : "/docs"
            }
          >
            {currentPath === "/docs/getting-started"
              ? "Docs"
              : currentPath === "/docs"
              ? "Docs"
              : "Getting Started"}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>
            {currentPath === "/docs/getting-started"
              ? "Getting Started"
              : currentPath === "/docs/getting-started/installation"
              ? "Installation"
              : currentPath === "/docs/getting-started/webhooks"
              ? "Webhooks"
              : currentPath === "/docs/getting-started/webhooks/overview"
              ? "Webhook Overview"
               : currentPath === "/docs/getting-started/webhooks/sync-data"
              ? "Sync Data"
              : currentPath === "/docs/troubleshooting"
              ? "Troubleshooting"
              : "Introduction"}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
