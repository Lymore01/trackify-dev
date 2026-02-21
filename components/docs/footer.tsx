"use client";

import { ExternalLink, Github, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

export function Footer() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col mt-12 text-muted-foreground text-sm">
      <Link
        href={`https://github.com/Lymore01/trackify-dev/tree/main/app${pathname}/page.mdx`}
        className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
      >
        <p>Edit this page on Github</p>
        <ExternalLink size={16} />
      </Link>
      <Separator className="my-8" />
      <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between gap-y-4 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
          <Link href={"/"}>
            <p className="text-sm text-muted-foreground font-light hover:text-foreground transition-colors">
              © 2026 Trackify Labs Inc.
            </p>
          </Link>
          <span className="hidden md:inline text-muted-foreground/40 text-xs">
            •
          </span>
          <p className="text-sm text-muted-foreground font-light">
            Made with ❤️ by{" "}
            <Link
              href="https://github.com/Lymore01"
              target="_blank"
              className="hover:text-blue-500 transition-colors underline underline-offset-4"
            >
              Kelly Limo
            </Link>
          </p>
        </div>
        <Link
          href="https://github.com/Lymore01/trackify-dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 -m-2 hover:text-foreground transition-colors"
        >
          <Github size={18} />
        </Link>
      </div>
    </div>
  );
}
