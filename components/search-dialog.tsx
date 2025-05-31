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
    [open]
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
            className="p-2 hidden md:flex gap-4 items-center justify-between rounded-lg cursor-pointer bg-accent dark:bg-accent dark:text-accent-foreground border "
          >
            <div className="flex items-center gap-2">
              <Search size={16} />
              <p className="text-muted-foreground text-sm">
                Search documentation
              </p>
            </div>
            <Shortcut setOpen={setOpen} />
          </div>
          {/* mobile */}
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
        className="fixed top-[10vh] translate-y-[25%] w-[98vw] max-w-screen-sm rounded-lg border bg-accent text-accent-foreground shadow-lg p-0"
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
            <File size={16} className="text-muted-foreground" />
          ) : (
            <Hash size={16} className="text-muted-foreground" />
          )}
          <span>{result.label}</span>
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
    <div className="text-xs text-muted-foreground bg-white/60 dark:bg-background dark:text-accent-foreground flex px-2 py-1 rounded-sm items-center gap-1 border">
      <kbd className="kbd">Ctrl</kbd> + <kbd className="kbd">K</kbd>
    </div>
  );
}
