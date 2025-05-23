import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { AppType } from "@/types/types";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

export default function SearchModal({
  open,
  openChange,
  applications,
  type,
}: {
  open: boolean;
  openChange: (value: boolean) => void;
  applications: AppType[];
  type?: "webhook" | "apps";
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredApps = applications.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[90vw] max-w-xl bg-white rounded-2xl shadow-lg p-6 relative"
          >
            <button
              onClick={() => openChange(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
              aria-label="Close search modal"
            >
              <X size={20} />
            </button>

            <Input
              autoFocus
              placeholder="Search applications..."
              className="mb-4 px-4 py-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mt-6"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Results */}
            <div className="max-h-64 overflow-y-auto space-y-2">
              {search && (
                <>
                  {filteredApps.length === 0 ? (
                    <p className="text-gray-500 text-sm px-1">
                      No applications found.
                    </p>
                  ) : (
                    filteredApps.map((app) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <button
                          className="w-full text-left px-2 py-3 rounded-md hover:bg-gray-100 transition text-sm"
                          onClick={() => {
                            if (type === "webhook") {
                              router.push(
                                `/dashboard/Shortly/webhooks?appId=${app.id}`
                              );
                            } else {
                              router.push(
                                `/dashboard/links?app=${app.id}&name=${app.name}`
                              );
                            }
                            openChange(false);
                          }}
                        >
                          {app.name}
                        </button>
                        <Separator className="my-1" />
                      </motion.div>
                    ))
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
