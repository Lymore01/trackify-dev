import { logOut } from "@/actions/actions";
import {motion} from "framer-motion";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  const handleLogout = async () => {
    await logOut();
  };
  return (
    <motion.button
      layout
      className="flex font-medium w-full rounded-md bg-primary p-2 capitalize items-center text-primary-foreground cursor-pointer"
      onClick={handleLogout}
    >
      <motion.div
        layout
        className="grid h-full place-content-center text-lg w-10"
      >
        <LogOut />
      </motion.div>
      <motion.span
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.125 }}
        className="text-sm font-medium"
        onClick={handleLogout}
      >
        Logout
      </motion.span>
    </motion.button>
  );
};