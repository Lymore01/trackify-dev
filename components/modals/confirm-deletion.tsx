"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { FileWarning, Loader } from "lucide-react";
import { Separator } from "../ui/separator";

export default function ConfirmDeletion({
  onDelete,
  onCancel,
  isPending = false,
}: {
  onDelete: () => void;
  onCancel: () => void;
  isPending?: boolean;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="deletion-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 grid place-content-center w-full h-screen fixed top-0 left-0 bg-black/50 z-50"
        onClick={onCancel}
        aria-modal="true"
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2 items-center mb-4">
            <FileWarning className="text-[red]"/>
            <h2 className="text-lg leading-none font-semibold">
              Confirm Deletion
            </h2>
          </div>
          <Separator className="mb-4" />
          <p className="text-muted-foreground text-sm mb-4">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              className="text-gray-600 dark:text-accent-foreground border-gray-200 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-accent cursor-pointer"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-red-600 dark:text-red-600 border-red-200 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-600  dark:hover:text-white cursor-pointer"
              onClick={onDelete}
            >
              {isPending ? (
                <div className="flex items-center">
                  <Loader className="animate-spin mr-2" size={16} />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
