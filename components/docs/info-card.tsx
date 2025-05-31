
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function InfoCard({
  title,
  items,
}: {
  title?: string;
  items: {
    icon?: LucideIcon;
    label: string;
    href?:string
  }[];
}) {
  return (
    <div className="rounded-lg bg-accent text-accent-foreground p-6 border border-muted-foreground/20 cursor-pointer hover:bg-muted-foreground/5 transition-colors max-w-sm mb-2">
      <h1 className="text-foreground text-md mb-2">{title}</h1>
      {items.map((item, index) => (
        <div className="flex gap-2 mb-2 items-center" key={index}>
          {item.icon && (
            <div className="text-muted-foreground">
                <item.icon size={16} />
            </div>
          )}
          
          <Link href={item.href ?? '#'} className="text-muted-foreground text-sm hover:underline">{item.label}</Link>
        </div>
      ))}
    </div>
  );
}
