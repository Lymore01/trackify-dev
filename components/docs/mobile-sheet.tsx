import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { AlignLeft } from "lucide-react";

export default function MobileSheet() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <span className="sr-only">Open Menu</span>
        <div className="flex gap-2 items-center">
          <AlignLeft size={16} />
          Menu
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Documentation</SheetDescription>
        </SheetHeader>
        <Sidebar className="block lg:hidden border-none"/>
      </SheetContent>
    </Sheet>
  );
}
