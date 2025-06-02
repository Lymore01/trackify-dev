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
      <div className="flex w-full items-center justify-between mb-8">
        <Link href={"/"}>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Trackify
          </p>
        </Link>
        <div className="text-foreground text-sm flex items-center">
          Built with <Heart className="fill-red-800 mx-2" size={12} />
          by Kelly Limo
        </div>
        <Link
          href="https://github.com/Lymore01/trackify-dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github
            size={16}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
}
