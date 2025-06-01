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
  type: "application" | "developers";
}

export const LINK_EVENTS = [
  "link_created",
  "link_updated",
  "link_deleted",
] as const;

export const USER_EVENTS = [
  "user_created",
  "user_updated",
  "user_deleted",
] as const;

export type EventType =
  | (typeof LINK_EVENTS)[number]
  | (typeof USER_EVENTS)[number];

// webhooks
export interface UserJSON {
  userId: string;
  email: string;
  password: string;
  callbackUrl: string;
}

export interface LinkJSON {
  shortId: string;
  ip: string;
  country?: string | "unknown";
  userAgent?: string | "unknown";
  geo?: any;
  deviceInfo?: Pick<UAParser.IDevice, "type">;
}

type Webhook<EvtType, Data> = {
  type: EvtType;
  data: Data;
};

export type UserWebhookEvent = Webhook<
  "user.created" | "user.deleted",
  UserJSON
>;

export type LinkWebhookEvent = Webhook<
  "link_clicked" | "link_created" | "link_deleted" | "link_updated",
  LinkJSON
>;
export type WebhookEvent = UserWebhookEvent | LinkWebhookEvent;
export type WebhookEventType = WebhookEvent["type"];

export type LinkType = {
  id: string;
  shortId: string;
  original: string;
  clicks: any[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AppType = {
  id: string;
  name: string;
  plan: string;
  updatedAt: Date;
};
