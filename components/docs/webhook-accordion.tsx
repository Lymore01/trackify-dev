import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname, useRouter } from "next/navigation";

export default function WebhookAccordion() {
  const router = useRouter();
  const currentPath = usePathname();
  const webhookPaths = [
    "/docs/getting-started/webhooks/overview",
    "/docs/getting-started/webhooks/sync-data",
  ];

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-foreground hover:no-underline cursor-pointer">
          Webhooks
        </AccordionTrigger>
        <AccordionContent>
          <WebhookList />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function WebhookList() {
  const router = useRouter();
  const currentPath = usePathname();
  const webhookPaths = [
    "/docs/getting-started/webhooks/overview",
    "/docs/getting-started/webhooks/sync-data",
  ];

  return (
    <ul className="space-y-2 pl-4 text-sm text-muted-foreground border-l">
      {webhookPaths.map((path) => (
        <li
          key={path}
          className={`hover:text-foreground cursor-pointer transition-colors capitalize ${
            currentPath === path ? "text-foreground font-semibold" : ""
          }`}
          onClick={() => router.push(path)}
        >
          {path.split("/").pop()?.replace(/-/g, " ") === "sync data"
            ? "Sync Trackify data to your app with webhooks"
            : path.split("/").pop()?.replace(/-/g, " ") || ""}
        </li>
      ))}
    </ul>
  );
}
