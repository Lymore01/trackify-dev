import { LucideIcon } from "lucide-react";
import {motion} from "framer-motion";

export const TabButton = ({
  currentTab,
  setCurrentTab,
  tab,
  Icon,
}: {
  currentTab: string;
  setCurrentTab: (value: string) => void;
  tab: string;
  Icon: LucideIcon;
}) => {
  return (
    <motion.li
      layout
      className={`${
        currentTab === tab
          ? "bg-indigo-100 text-blue-600"
          : "text-slate-500 hover:bg-slate-100"
      } font-medium cursor-pointer transition-colors p-2 rounded-md text-sm capitalize flex items-center`}
      onClick={() => setCurrentTab(tab)}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>

      <motion.span
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.125 }}
        className="text-sm font-medium"
      >
        {tab}
      </motion.span>
    </motion.li>
  );
};