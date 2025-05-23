"use client";

import Image from "next/image";
import { Separator } from "../ui/separator";
import ProfileInfoCard from "../profile-info-card";
import { Button } from "../ui/button";
import { X, LogOut, Trash2, Lock } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "../ui/input";
import ChangePassForm from "../forms/change-password";
import { logOut } from "@/actions/actions";
import { useAuth } from "@/hooks/use-auth";

export default function ProfileModal({
  open,
  openChange,
}: {
  open: boolean;
  openChange: (value: boolean) => void;
}) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useAuth();

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    // 🔐 Replace with your backend call here
    alert("Password successfully changed!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);
  };

  const handleLogout = async () => {
    await logOut();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="profile-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid place-content-center w-full h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.4)] z-50"
      >
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="bg-white dark:bg-slate-900 rounded-2xl w-[90vw] lg:w-[50vw] h-[85vh] flex flex-col relative overflow-auto shadow-xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4">
            <h1 className="text-slate-900 dark:text-white text-xl">Profile</h1>
            <div
              onClick={() => openChange(false)}
              className="bg-black text-white rounded-lg cursor-pointer p-2 hover:bg-indigo-700 transition"
            >
              <X size={16} />
            </div>
          </div>
          <Separator />

          {/* Body */}
          <div className="flex flex-col w-full h-full p-4 gap-6">
            {/* Profile Info */}
            <div className="space-y-4">
              <h1 className="text-lg font-medium text-slate-800 dark:text-white">
                Profile Information
              </h1>
              <div className="bg-gray-100 dark:bg-slate-800 grid grid-cols-1 lg:grid-cols-2 rounded-xl w-full p-4 gap-6">
                <div className="flex flex-col items-start gap-4">
                  <Image
                    src={"/images/profile.jpg"}
                    alt={"profile picture"}
                    width={96}
                    height={96}
                    className="rounded-full object-cover size-24 border-2 border-indigo-200 cursor-pointer"
                    onClick={() => {
                      alert("Image Clicked");
                    }}
                  />
                  <Button className="bg-black hover:bg-indigo-700 transition cursor-pointer">
                    Change Image
                  </Button>
                </div>

                <ProfileInfoCard
                  name={user.name}
                  email={user.email}
                  plan={user.plan}
                />
              </div>
            </div>

            {/* Account Section */}
            <div className="space-y-4">
              <h1 className="text-lg font-medium text-slate-800 dark:text-white">
                Account
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Manage your account preferences and actions
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-red-600 border-red-200 hover:border-red-400 hover:bg-red-50 dark:hover:bg-slate-800 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Log out
                </Button>

                <Button
                  variant="destructive"
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    const confirmDelete = confirm(
                      "Are you sure you want to delete your account? This action is irreversible."
                    );
                    if (confirmDelete) {
                      alert("Account deleted");
                    }
                  }}
                >
                  <Trash2 size={16} />
                  Delete Account
                </Button>

                {/* Change Password Toggle */}
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-indigo-600 hover:underline text-sm cursor-pointer"
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                >
                  <Lock size={16} />
                  {showPasswordForm ? "Cancel Change" : "Change Password"}
                </Button>
              </div>

              {/* Password Form */}
              {showPasswordForm && (
                <div className="space-y-4 mt-2 bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
                  <ChangePassForm />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
