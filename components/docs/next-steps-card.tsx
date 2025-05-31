"use client";
import { useRouter } from "next/navigation";

export default function NextSteps({
  title,
  description,
  href,
}: {
  title?: string;
  description?: string;
  href?: string;
}) {
  const router = useRouter();
  return (
    <div
      className="rounded-lg bg-background p-6 border border-muted-foreground/20 cursor-pointer hover:bg-muted-foreground/5 transition-colors max-w-sm mb-2"
      onClick={() => href && router.push(href)}
    >
      <h1 className="text-foreground text-md">{title}</h1>
      <p className="text-muted-foreground text-sm mt-2">{description}</p>
    </div>
  );
}
