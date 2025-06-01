import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium mx-4 my-2 transition-all",
  {
    variants: {
      variant: {
        default:
          "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300",
        error:
          "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300",
        info:
          "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300",
        warning:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-700/20 dark:text-yellow-300",
        neutral:
          "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export default function Tag({
  variant,
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof tagVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(tagVariants({ variant, className }))}
      {...props}
    />
  );
}
