"use client";

import { Edit2, Check, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useUpdateUser } from "@/hooks/use-update-user";

type Props = {
  name: string;
  email: string;
  plan: string;
};

export default function ProfileInfoCard({ name, email, plan }: Props) {
  const [editMode, setEditMode] = useState({ name: false, email: false });
  const [values, setValues] = useState({ name, email });
  const { updateUser, isPending } = useUpdateUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = (field: "name" | "email") => {
    setValues((prev) => ({
      ...prev,
      [field]: field === "name" ? name : email,
    }));
    setEditMode((prev) => ({ ...prev, [field]: false }));
  };

  const handleSave = async (field: "name" | "email") => {
    try {
      await updateUser({ [field]: values[field] });
      setEditMode((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      // Error handled by hook
    }
  };

  return (
    <div className="w-full">
      <div className="p-0 space-y-px bg-border/40">
        <FieldBlock
          label="Name"
          field="name"
          value={values.name}
          isEditing={editMode.name}
          onEdit={() => setEditMode({ ...editMode, name: true })}
          onChange={handleChange}
          onCancel={() => handleCancel("name")}
          onSave={() => handleSave("name")}
          isPending={isPending}
        />
        <FieldBlock
          label="Email"
          field="email"
          value={values.email}
          isEditing={editMode.email}
          onEdit={() => setEditMode({ ...editMode, email: true })}
          onChange={handleChange}
          onCancel={() => handleCancel("email")}
          onSave={() => handleSave("email")}
          isPending={isPending}
        />

        <div className="bg-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
              Current Plan
            </label>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-blue-100/80 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-none px-4 py-1.5 text-[11px] font-bold"
              >
                {plan}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="font-normal transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 self-end sm:self-center"
          >
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  );
}

function FieldBlock({
  label,
  field,
  value,
  isEditing,
  onEdit,
  onChange,
  onCancel,
  onSave,
  isPending,
}: {
  label: string;
  field: "name" | "email";
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSave: () => void;
  isPending: boolean;
}) {
  return (
    <div className="group bg-card p-6 transition-colors hover:bg-muted/5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor={field}
          className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[10px]"
        >
          {label}
        </label>

        <div className="flex items-center justify-between gap-4 min-h-[40px]">
          {isEditing ? (
            <div className="flex w-full items-center gap-3">
              <Input
                id={field}
                name={field}
                value={value}
                onChange={onChange}
                className="h-10 py-2 px-3 bg-muted/20 border-border focus-visible:ring-1 focus-visible:ring-blue-500 shadow-none text-sm font-medium"
                autoFocus
                disabled={isPending}
              />
              <div className="flex gap-1 shrink-0">
                <Button
                  onClick={onSave}
                  size="icon"
                  variant="outline"
                  className="text-green-600 border-green-200 hover:bg-green-50 dark:border-green-900/40 dark:hover:bg-green-900/20 shadow-none"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Check size={18} />
                  )}
                </Button>
                <Button
                  onClick={onCancel}
                  size="icon"
                  variant="outline"
                  className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-900/20 shadow-none"
                  disabled={isPending}
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <span
                id={field}
                className="text-base font-semibold tracking-tight"
              >
                {value}
              </span>
              <Button
                onClick={onEdit}
                variant="ghost"
                size="sm"
                className="font-bold opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              >
                <Edit2 size={12} className="mr-1.5" />
                Edit
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
