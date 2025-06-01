"use client";

import { Edit2, Check, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Tag from "./tag";

type Props = {
  name: string;
  email: string;
  plan: string;
};

export default function ProfileInfoCard({ name, email, plan }: Props) {
  const [editMode, setEditMode] = useState({ name: false, email: false });
  const [values, setValues] = useState({ name, email });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = (field: "name" | "email") => {
    setValues((prev) => ({ ...prev, [field]: field === "name" ? name : email }));
    setEditMode((prev) => ({ ...prev, [field]: false }));
  };

  const handleSave = (field: "name" | "email") => {
    setEditMode((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div className="space-y-6 w-full rounded-xl p-4 bg-background shadow-sm">
      <FieldBlock
        label="Name"
        field="name"
        value={values.name}
        isEditing={editMode.name}
        onEdit={() => setEditMode({ ...editMode, name: true })}
        onChange={handleChange}
        onCancel={() => handleCancel("name")}
        onSave={() => handleSave("name")}
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
      />

      <div className="space-y-1">
        <label htmlFor="plan" className="block text-sm font-medium text-black dark:text-foreground">
          Current Plan
        </label>
        <div className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-50 dark:bg-accent">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <Tag className="ml-[-4] flex">Free Plan</Tag>
          </span>
          <Edit2 className="text-white bg-black hover:bg-indigo-700 p-2 rounded-md size-8 cursor-pointer transition" size={16} />
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
}: {
  label: string;
  field: "name" | "email";
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={field} className="block text-sm font-medium text-black dark:text-foreground">
        {label}
      </label>
      <div className="flex items-center justify-between px-3 py-2 rounded-md dark:bg-accent">
        {isEditing ? (
          <div className="flex w-full items-center justify-between gap-2">
            <input
              id={field}
              name={field}
              type="text"
              value={value}
              onChange={onChange}
              className="flex-1 text-sm bg-transparent outline-none text-slate-800 dark:text-slate-200"
              autoFocus
            />
            <div className="flex gap-1">
              <button onClick={onSave} className="text-green-600 hover:text-green-800">
                <Check size={18} />
              </button>
              <button onClick={onCancel} className="text-red-600 hover:text-red-800">
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <span id={field} className="text-sm text-slate-800 dark:text-slate-200">{value}</span>
            <Edit2
              onClick={onEdit}
              className="text-black dark:text-foreground cursor-pointer hover:text-indigo-800 transition"
              size={16}
            />
          </>
        )}
      </div>
    </div>
  );
}
