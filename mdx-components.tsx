import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-foreground text-3xl">{children}</h1>
    ),
    h2: ({ children }) => {
      const text = typeof children === "string" ? children : (Array.isArray(children) ? children.join("") : "");
      const id = slugify(text);
      return (
        <h2 className="text-foreground text-xl" id={id}>
          {children}
        </h2>
      );
    },
    p: ({ children }) => (
      <p className="text-muted-foreground text-md leading-7">{children}</p>
    ),
    li: ({ children }) => (
      <li className="text-muted-foreground text-md leading-7 list-none">
        <span className="mr-2">-</span>
        {children}
      </li>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  };
}