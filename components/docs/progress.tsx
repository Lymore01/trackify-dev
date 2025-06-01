"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type Heading = {
  id: string;
  text: string;
  level: number;
};

function getHeadings(): Heading[] {
  if (typeof window === "undefined") return [];
  return Array.from(document.querySelectorAll("h2, h3"))
    .filter((el) => el.id)
    .map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
}

export function Progress() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname()

  useEffect(() => {
    setHeadings(getHeadings());

    const handle = () => setHeadings(getHeadings());
    window.addEventListener("resize", handle);

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: [0, 1.0],
      }
    );

    const elements = document.querySelectorAll("h2, h3");
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("resize", handle);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <aside className="col-span-3 bg-background p-6 h-full overflow-y-auto hidden lg:flex">
      <nav>
        <h1 className="text-sm text-foreground font-semibold mb-4">
          On this page
        </h1>
        <ul className="text-muted-foreground text-sm space-y-2 border-l pl-4">
          {headings.map((heading) => (
            <li key={heading.id} className="relative">
              <a
                href={`#${heading.id}`}
                className={clsx(
                  "block px-2 py-1 rounded transition-all duration-300",
                  heading.level === 3 && "ml-4 text-xs",
                  activeId === heading.id
                    ? "text-foreground"
                    : "hover:text-foreground"
                )}
                style={{
                  transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
