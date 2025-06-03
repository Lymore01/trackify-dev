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
import { useAuth } from "@/hooks/use-auth";
import { TabButton } from "@/components/tab-button";
import { LogoutButton } from "@/components/logout-button";

export default function Settings() {
  const [currentTab, setCurrentTab] = useState("profile");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const user = useAuth();

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
                <h1 className="text-sm">{user.name}</h1>
                <h1 className="text-sm text-blue-600">{user.email}</h1>
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
                value={user.email}
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
                    value={user.password}
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




