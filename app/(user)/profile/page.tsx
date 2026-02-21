"use client";

import { LogOut, Trash2, Lock, User, ShieldCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ChangePassForm from "@/components/forms/change-password";
import { useAuth } from "@/hooks/use-auth";
import { logOut } from "@/actions/actions";
import { motion, AnimatePresence } from "framer-motion";
import ProfileInfoCard from "@/components/profile-info-card";
import { useDeleteUser } from "@/hooks/use-delete-user";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { user, isLoading } = useAuth();
  const { deleteUserAccount, isPending: isDeleting } = useDeleteUser();

  const handleLogout = async () => {
    toast.success("Logging out...");
    await logOut();
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account? This action is irreversible.",
    );
    if (confirmDelete) {
      await deleteUserAccount();
    }
  };

  return (
    <div className="flex flex-col h-max w-full lg:w-[60%] mx-auto my-12 px-4 lg:px-0 mb-24 space-y-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium tracking-tight">
          Account Settings
        </h1>
        <p className="text-muted-foreground text-base max-w-2xl">
          Manage your personal information, security preferences, and account
          status in one place.
        </p>
      </div>

      <div className="space-y-10">
        {/* Profile Info Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-lg font-medium mb-5 px-1">Profile Information</h2>
          <Card className="rounded-2xl border-border/50 shadow-sm transition-all hover:border-border/80">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <Separator className="opacity-50" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-6 w-64" />
                  </div>
                  <Separator className="opacity-50" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                  </div>
                </div>
              ) : (
                <ProfileInfoCard
                  name={user.name}
                  email={user.email}
                  plan={user.plan}
                />
              )}
            </CardContent>
          </Card>
        </section>

        {/* Security Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <h2 className="text-lg font-medium mb-5 px-1">Security & Password</h2>
          <Card className="rounded-2xl border-border/50 shadow-sm overflow-hidden transition-all hover:border-border/80">
            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-base font-medium">
                  Account Password
                </CardTitle>
                <CardDescription className="text-sm">
                  Ensure your account is using a strong password.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="font-normal border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-900/40 dark:text-blue-400 dark:hover:bg-blue-900/20"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                {showPasswordForm ? "Cancel" : "Change Password"}
              </Button>
            </div>

            <AnimatePresence>
              {showPasswordForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-muted/20 dark:bg-muted/10 border-t border-border/40"
                >
                  <div className="p-6 md:p-10 max-w-xl mx-auto">
                    <ChangePassForm username={user?.name || ""} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </section>

        <Separator className="opacity-50" />

        {/* Action Cards Cluster */}
        <div className="space-y-4">
          <Card className="flex flex-row items-center justify-between p-6 rounded-2xl bg-muted/10 border-dashed shadow-none hover:bg-muted/20 transition-colors">
            <div className="space-y-1">
              <p className="font-semibold text-sm">Session Management</p>
              <p className="text-xs text-muted-foreground">
                Sign out of your account on this device.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground font-normal"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Sign out
            </Button>
          </Card>

          <Card className="flex flex-row items-center justify-between p-6 rounded-2xl border-red-200/50 dark:border-red-900/30 bg-red-50/20 dark:bg-red-900/5 shadow-none hover:bg-red-50/40 dark:hover:bg-red-900/10 transition-colors">
            <div className="space-y-1">
              <p className="font-semibold text-sm text-red-600 dark:text-red-400">
                Danger Zone
              </p>
              <p className="text-xs text-muted-foreground">
                Account deletion is permanent and cannot be undone.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="font-normal shadow-sm transition-transform active:scale-95 px-5"
              onClick={handleDeleteAccount}
              disabled={user?.name === "Test User" || isDeleting || isLoading}
            >
              {isDeleting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              Delete Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
