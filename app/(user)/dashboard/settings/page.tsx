"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  Eye,
  EyeClosed,
  LogOut,
  LucideIcon,
  User,
  UserCircle,
  UserCogIcon,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { logOut } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";

export default function Settings() {
  const [currentTab, setCurrentTab] = useState("profile");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col h-max w-[60%] mx-auto my-4">
      <h1 className="text-xl my-2">Settings</h1>
      <Separator className="my-4" />
      {/* content */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="space-y-4 text-gray-600 p-4">
          <ul className="space-y-4 text-base">
            <TabButton
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              tab="profile"
              Icon={UserCircle}
            />
            <TabButton
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              tab="account"
              Icon={UserCogIcon}
            />

            <LogoutButton />
          </ul>
        </div>
        {currentTab === "profile" ? (
          <div className="col-span-2 p-4 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="rounded-full size-24 relative">
                <Image
                  src={"/images/aside.jpg"}
                  alt="profile image"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <h1 className="text-sm">{userData?.data.name}</h1>
                <h1 className="text-sm text-blue-600">{userData?.data.email}</h1>
              </div>
            </div>
            <Button>Change Image</Button>
          </div>
        ) : (
          <div className="p-4 flex flex-col gap-4 col-span-2">
            {/* email address */}
            <div className="flex flex-col gap-4">
              <label htmlFor="email">Email</label>
              <Input
                placeholder="Email"
                value={userData?.data.email}
                id="email"
                disabled
              />
            </div>
            {/* password */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-4">
                <label htmlFor="password">Password</label>
                <div className="relative" id="password">
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="password"
                    value={userData?.data.password}
                    autoComplete="off"
                    disabled
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!isPasswordVisible)}
                    className="absolute right-2 top-2.5 text-gray-500"
                  >
                    {isPasswordVisible ? (
                      <EyeClosed size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div className="h-full flex items-end justify-end">
                <Button className="cursor-pointer">Update Password</Button>
              </div>
            </div>
            {/* delete Account */}
            <div className="flex items-start mt-8">
              <Button className="bg-red-600 text-white cursor-pointer">
                Delete Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const TabButton = ({
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

const LogoutButton = () => {
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
