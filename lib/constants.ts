import { ItemsProp } from "@/types/types";
import { File, Home, Key, KeyIcon, Settings, Webhook } from "lucide-react";

export const NAV_ITEMS: ItemsProp[] = [
  {
    href: "/dashboard",
    icon: Home,
    title: "Dashboard",
    type: "application",
  },
  {
    href: "/dashboard/webhook",
    icon: Webhook,
    title: "Webhooks",
    type: "developers",
  },
  {
    href: "/dashboard/api",
    icon: KeyIcon,
    title: "Api keys",
    type: "developers",
  },
  {
    href: "/dashboard/settings",
    icon: Settings,
    title: "Settings",
    type: "application",
  },
  {
    href: "/dashboard/docs",
    icon: File,
    title: "API docs",
    type: "developers",
  },
];

export const LINK_EVENTS: string[] = [
  "link_created",
  "link_updated",
  "link_deleted",
  "link_clicked",
];
export const USER_EVENTS: string[] = [
  "user_created",
  "user_updated",
  "user_deleted",
];

export const eventPayloadMap: Record<string, string> = {
  user_created: `
    {
      "data": {
        "userId": "2uRDtVrgPzD3G04w7sL0CVD5OLh",
        "email": "example@example.com",
        "password": "12345678",
        "callbackUrl": "https://www.example.com/api/webhooks/trackify"
      }
    }
  `,
  user_updated: `
    {
      "data": {
        "userId": "2uRDtVrgPzD3G04w7sL0CVD5OLh",
        "email": "example@example.com",
        "updatedFields": {
          "firstName": "UpdatedName",
          "lastName": "UpdatedLastName"
        },
        "callbackUrl": "https://www.example.com/api/webhooks/trackify"
      }
    }
  `,
  user_deleted: `
    {
      "data": {
        "userId": "2uRDtVrgPzD3G04w7sL0CVD5OLh",
        "callbackUrl": "https://www.example.com/api/webhooks/trackify"
      }
    }
  `,
  link_created: `
    {
      "data": {
        "linkId": "ABC123",
        "eventType": "link_clicked",
        "url": "https://www.example.com"
      }
    }
  `,
  link_updated: `
    {
      "data": {
        "linkId": "ABC123",
        "updatedFields": {
          "url": "https://www.updated-example.com"
        },
        "callbackUrl": "https://www.example.com/api/webhooks/trackify"
      }
    }
  `,
  link_deleted: `
    {
      "data": {
        "linkId": "ABC123",
        "callbackUrl": "https://www.example.com/api/webhooks/trackify"
      }
    }
  `,
  link_clicked: `
    {
      "data": {
        "linkId": "ABC123",
        "eventType": "link_clicked",
        "clickTime": "2025-05-06T14:30:00Z"
      }
    }
  `
};

export const mockRequest = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer abc123",
    "x-webhook-signature":
      "9146729876fc7fcc6fd82ef979c658e7cbfd493d7f2df2032466cb1409e948f3",
    "x-api-key": "aa5d9ce0-b6c5-4f5e-bbb4-f9c24abcef1f",
  },
  body: {
    userId: "2uRDtVrgPzD3G04w7sL0CVD5OLh",
    email: "example@example.com",
    password: "12345678",
    callbackUrl: "https://www.example.com/api/webhooks/trackify",
  },
  status: 200,
};
