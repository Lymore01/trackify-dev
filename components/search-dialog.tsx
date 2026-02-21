"use client";

import { Search, File, Hash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { searchDocs } from "@/lib/search-docs";

export default function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, onSearchChange] = React.useState("");
  const [active, setActive] = React.useState<string | undefined>(undefined);

  const onKey = React.useCallback(
    (e: KeyboardEvent) => {
      if (open && e.key === "Escape") {
        setOpen(false);
        e.preventDefault();
      }
    },
    [open],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [onKey]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=closed]:animate-fd-fade-out data-[state=open]:animate-fd-fade-in" />
      <DialogTrigger asChild>
        <div>
          <div
            role="button"
            className="group/trigger w-full px-3 py-2.5 hidden md:flex gap-3 items-center justify-between rounded-xl cursor-pointer bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/80 text-muted-foreground hover:text-foreground border border-border/50 transition-all duration-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Search
                size={16}
                className="shrink-0 opacity-60 group-hover/trigger:opacity-100 transition-opacity"
              />
              <p className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                Search docs...
              </p>
            </div>
            <Shortcut setOpen={setOpen} />
          </div>
          <Button
            variant={"outline"}
            className="flex md:hidden"
            onClick={() => setOpen(true)}
          >
            <Search size={16} />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-[95vw] md:max-w-2xl rounded-xl border bg-accent text-accent-foreground shadow-2xl p-0 overflow-hidden"
      >
        <DialogTitle className="hidden">Search Docs</DialogTitle>
        <div className="flex flex-row items-center gap-2 px-3 mt-3.5">
          <Search size={16} className="text-muted-foreground" />
          <input
            value={value}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setActive(undefined);
            }}
            placeholder={"Search"}
            className="w-0 flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none"
          />
        </div>
        <Separator />
        {/* content */}
        <SearchResults
          value={value}
          setActive={setActive}
          active={active}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

function SearchResults({
  value,
  setActive,
  active,
  setOpen,
}: {
  value: string;
  setActive: (active: string | undefined) => void;
  active: string | undefined;
  setOpen: (open: boolean) => void;
}) {
  const results = searchDocs(value);

  return (
    <div className="max-h-72 overflow-y-auto">
      {value && results.length === 0 && (
        <div className="px-3 py-2">
          <p className="text-muted-foreground text-sm">No results found.</p>
        </div>
      )}
      {results.map((result, idx) => (
        <a
          key={result.url + result.label}
          href={result.url}
          className={`flex items-center gap-2 px-3 py-2 text-muted-foreground border-b text-sm rounded transition-colors hover:bg-background hover:text-foreground`}
          onMouseEnter={() => setActive(result.url)}
          onClick={() => setOpen(false)}
        >
          {result.icon === "file" ? (
            <File size={16} className="text-muted-foreground shrink-0" />
          ) : (
            <Hash size={16} className="text-muted-foreground shrink-0" />
          )}
          <span className="truncate flex-1">{result.label}</span>
        </a>
      ))}
    </div>
  );
}

function Shortcut({ setOpen }: { setOpen: (open: boolean) => void }) {
  const onKey = React.useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
      setOpen(true);
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [onKey]);

  return (
    <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-border/50 bg-background/50 text-[10px] font-medium text-muted-foreground/70 tracking-tighter shadow-sm">
      <kbd className="font-sans">Ctrl</kbd>
      <span className="opacity-40 font-light">+</span>
      <kbd className="font-sans">K</kbd>
    </div>
  );
}
