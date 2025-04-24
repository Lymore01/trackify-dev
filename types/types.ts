import { LucideIcon } from "lucide-react";
import { z } from "zod";

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
  country: string | "unknown";
  userAgent: string | "unknown";
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
  "link.clicked" | "link.deleted",
  LinkJSON
>;
export type WebhookEvent = UserWebhookEvent | LinkWebhookEvent;
export type WebhookEventType = WebhookEvent["type"];
