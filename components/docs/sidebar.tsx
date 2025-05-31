"use client";
import { useDocs } from "@/contexts/useDocs";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import WebhookAccordion from "./webhook-accordion";

const navItems = [
  {
    name: "Getting Started",
    href: "/docs/getting-started",
    description: "Learn how to set up and use Trackify",
  },
  {
    name: "Installation",
    href: "/docs/getting-started/installation",
    description: "A quick guide to get you started with Trackify",
  },
];
export function Sidebar({ className }: { className?: string }) {
  const { currentPath } = useDocs();

  return (
    <aside
      className={`col-span-3 bg-background p-6 h-full border-r border-dashed overflow-y-auto ${className}`}
    >
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="mb-2">
              <a
                href={item.href}
                className={cn(
                  "text-muted-foreground text-sm hover:text-foreground transition-colors",
                  item.href === currentPath && "font-semibold text-foreground"
                )}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-[-8px]">
        <WebhookAccordion />
      </div>
    </aside>
  );
}
