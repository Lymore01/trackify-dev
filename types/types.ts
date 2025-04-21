import { LucideIcon } from "lucide-react";

type User = {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  apiKey: string;
};

export interface ItemsProp {
  icon: LucideIcon;
  title: string;
  href: string;
  type: "application" | "developers"
}

export const LINK_EVENTS = [
  "link.created",
  "link.updated",
  "link.deleted",
] as const;

export const USER_EVENTS = [
  "user.created",
  "user.updated",
  "user.deleted",
] as const;

export type EventType = typeof LINK_EVENTS[number] | typeof USER_EVENTS[number];
