import { ItemsProp } from "@/types/types";
import { File, Home, Key, KeyIcon, Settings, Webhook } from "lucide-react";
import { CardProps } from "../app/page";

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
];

export const LINK_EVENTS: string[] = [
  "link_created",
  "link_updated",
  "link_deleted",
  "link_clicked",
];

//! Deprecated
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
  link_created: `{
  "type": "link_created",
  "data": {
    "linkId": "ABC123",
    "eventType": "link_created",
    "url": "https://www.example.com",
    "shortUrl": "https://trkfy.io/abc123",
    "createdAt": "2025-05-21T14:30:00Z"
  }
}
  `,
  link_updated: `{
  "type": "link_updated",
  "data": {
    "linkId": "ABC123",
    "updatedFields": {
      "url": "https://www.updated-example.com",
      "isActive": true
    },
    "callbackUrl": "https://www.example.com/api/webhooks/trackify",
    "updatedAt": "2025-05-21T15:45:00Z"
  }
}
  `,
  link_deleted: `{
  "type": "link_deleted",
  "data": {
    "linkId": "ABC123",
    "deletedBy": "user_789xyz",
    "reason": "User requested deletion",
    "callbackUrl": "https://www.example.com/api/webhooks/trackify",
    "deletedAt": "2025-05-21T16:00:00Z"
  }
}
  `,
  link_clicked: `{
  "type": "link_clicked",
  "data": {
    "shortId": "abc123",
    "ip": "102.123.45.67",
    "country": "Kenya",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36",
    "geo": {
      "city": "Nairobi",
      "region": "Nairobi County",
      "lat": -1.2921,
      "lon": 36.8219
    },
    "deviceInfo": {
      "type": "desktop"
    }
  }
}
  `,
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

// landing page related
export const STATS: CardProps[] = [
  {
    stat: "10K",
    value: "Apps Managed",
  },
  {
    stat: "2.5M",
    value: "API req / month",
  },
  {
    stat: "100",
    value: "SDK downloads",
  },
];

interface Testimonials {
  name: string;
  image: string;
  company?: string;
  text: string;
}

export const TESTIMONIALS: Testimonials[] = [
  {
    name: "Jane Maina",
    image: "/images/aside.jpg",
    text: "Trackify made it so easy to monitor my shop links and see what’s working. The analytics are a game changer!",
    company: "Web Developer",
  },
  {
    name: "Samuel Kiptoo",
    image: "/images/aside.jpg",
    text: "Integration was seamless. As a developer, I love the SDK and API flexibility. Highly recommended!",
    company: "Product Manager",
  },
  {
    name: "Amina Yusuf",
    image: "/images/aside.jpg",
    text: "I use Trackify for all my marketing campaigns. The insights helped me double my conversion rate.",
    company: "Software Engineer",
  },
  {
    name: "Chris Nekesa",
    image: "/images/aside.jpg",
    text: "Shortening and sharing docs with Trackify is so smooth. My team always knows what’s most useful.",
    company: "Product Manager",
  },
];

export const howItWorksSection = [
  {
    title: "Create an app on your dashboard",
    content:
      "Start by creating an app to manage your links, webhooks, and analytics all in one place.",
    image: "/images/create-app.png",
  },
  {
    title: "Add and manage your links with ease",
    content:
      "Easily add, update, and organize your app links from your dashboard.",
    image: "/images/add-link.png",
  },
  {
    title: "Access real-time link analytics and insights",
    content:
      "Track click-throughs, traffic sources, and user interactions in real time.",
    image: "/images/track-link.png",
  },
  {
    title: "Configure your webhook URL to receive events",
    content:
      "Set up a webhook endpoint to get notified whenever a link is clicked.",
    image: "/images/add-webhook.png",
  },
  {
    title: "Integrate seamlessly using our lightweight SDK (coming soon 😊)",
    content:
      "Our upcoming SDK will make it easy to connect and interact with your app programmatically.",
  },
  {
    title: "Receive instant link events through your webhook",
    content:
      "Get instant event data sent to your webhook for real-time processing and insights.",
    image: "/images/get-links.png",
  },
];
