"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowRight, ChevronsUpDown } from "lucide-react";
import Link from "next/link";

export default function TopNav() {
  return (
    <div className="flex gap-2 items-center text-sm pb-3">
      <Link href={"/dashboard"}>Apps</Link>
      <span>/</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Button
              variant={"outline"}
              className="cursor-pointer items-center flex"
            >
              Docx{" "}
              <span>
                <ChevronsUpDown size={16} />
              </span>
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>Apps</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <AppOption app="Docx" />
          <AppOption app="Shortly" />
          <AppOption app="AnalyticsPro" />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const AppOption = ({ app }: { app: string }) => {
  return (
    <DropdownMenuItem className="flex w-full items-center justify-between cursor-pointer group">
      {app}{" "}
      <div>
        <ArrowRight
          size={16}
          className="hidden group-hover:block transition ease-in ml-4"
        />
      </div>
    </DropdownMenuItem>
  );
};
