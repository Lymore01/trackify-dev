"use client";

import {
  ChevronDown,
  ChevronRight,
  DollarSign,
  Home,
  LucideIcon,
  Webhook,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { Separator } from "./ui/separator";

export default function CustomSidebar() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      className="fixed top-0 border-r bg-gray-100  h-screen p-2 shrink-0"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <HeaderSection open={open} />
      <div className="space-y-1">
        <OptionGroup
          selected={selected}
          setSelected={setSelected}
          open={open}
          type="application"
        />
        <Separator className="my-2" />
        <OptionGroup
          selected={selected}
          setSelected={setSelected}
          open={open}
          type="developers"
        />
      </div>
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
}

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
  href,
}: {
  Icon: LucideIcon;
  title: string;
  selected: string;
  setSelected: (value: string) => void;
  open: boolean;
  notifs?: number;
  href: string;
}) => {
  const router = useRouter();
  return (
    <motion.button
      onClick={() => {
        setSelected(title);
        router.push(href);
      }}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors cursor-pointer ${
        selected === title
          ? "bg-indigo-100 text-blue-600"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}
      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-blue-600 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const OptionGroup = ({
  selected,
  setSelected,
  open,
  type,
}: {
  selected: string;
  setSelected: (value: string) => void;
  open: boolean;
  type: "application" | "developers";
}) => {
  return (
    <div className="space-y-1">
      {open && (
        <motion.h1
          layout
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{ delay: 0.125 }}
          className="text-xs text-slate-500 capitalize"
        >
          {type}
        </motion.h1>
      )}
      {NAV_ITEMS.filter((item) => {
        return item.type === type;
      }).map((item, idx) => (
        <Option
          key={idx}
          Icon={item.icon}
          title={item.title}
          href={item.href}
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      ))}
    </div>
  );
};

const HeaderSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-3 pb-3 border-b">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-gray-200">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">Kelly Limo</span>
              <span className="block text-xs text-gray-600">Pro Plan</span>
            </motion.div>
          )}
        </div>
        {open && <ChevronDown size={16} className="mr-2" />}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 36 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 15V31H5C5.52527 31 6.04541 31.1035 6.53076 31.3045C7.01599 31.5055 7.45703 31.8001 7.82837 32.1716C8.19983 32.543 8.49451 32.984 8.69556 33.4693C8.89648 33.9546 9 34.4747 9 35V40H21L36 25V9H31C30.4747 9 29.9546 8.89655 29.4692 8.69553C28.984 8.49451 28.543 8.19986 28.1716 7.82843C27.8002 7.457 27.5055 7.01602 27.3044 6.53073C27.1035 6.04544 27 5.5253 27 5V0H15L0 15ZM17 30H10V19L19 10H26V21L17 30Z"
          fill="#0004E8"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (pv: any) => void;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv: any) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <ChevronRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};
