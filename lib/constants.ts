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
    stat: "340",
    value: "Apps Managed",
  },
  {
    stat: "800K",
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
    name: "Jane Wanjiku",
    image: "https://img.freepik.com/free-photo/side-view-young-woman-wearing-sunglasses_23-2149452670.jpg?uid=R196512584&ga=GA1.1.1549616876.1743794615&semt=ais_hybrid&w=740",
    text: "Trackify has made it effortless to track my online shop links. I can now see which campaigns are driving real sales in Nairobi. The analytics dashboard is a lifesaver!",
    company: "E-commerce Entrepreneur, Nairobi",
  },
  {
    name: "Samuel Kiptoo",
    image: "https://img.freepik.com/free-photo/close-up-smiley-man-with-glasses_23-2149009406.jpg?uid=R196512584&ga=GA1.1.1549616876.1743794615&semt=ais_hybrid&w=740",
    text: "Integrating Trackify into our SaaS platform was straightforward. The webhook notifications help us keep our CRM in sync with every link click. Highly recommended for Kenyan startups!",
    company: "Software Engineer, Eldoret",
  },
  {
    name: "Amina Yusuf",
    image: "https://img.freepik.com/free-photo/medium-shot-happy-friends-outdoors_23-2149009416.jpg?uid=R196512584&ga=GA1.1.1549616876.1743794615&semt=ais_hybrid&w=740",
    text: "I use Trackify for all my digital marketing campaigns. The real-time click data helps me optimize my ads for Mombasa audiences. My conversion rates have improved significantly.",
    company: "Digital Marketer, Mombasa",
  },
  {
    name: "Chris Nekesa",
    image: "https://img.freepik.com/free-photo/portrait-young-man-with-afro-dreadlocks-white-t-shirt-outdoors_23-2149451577.jpg?uid=R196512584&ga=GA1.1.1549616876.1743794615&semt=ais_hybrid&w=740",
    text: "Sharing short links with Trackify is so easy, and the webhook integration means my team always gets notified instantly. We love the local support and reliability.",
    company: "Product Manager, Kisumu",
  },
];

export const howItWorksSection = [
  {
    title: "Create an app on your dashboard",
    content:
      "Start by creating an app to manage your links, webhooks, and analytics all in one place.",
    image: "/images/create-app.jpeg",
  },
  {
    title: "Add and manage your links with ease",
    content:
      "Easily add, update, and organize your app links from your dashboard.",
    image: "/images/add-link.jpeg",
  },
  {
    title: "Access real-time link analytics and insights",
    content:
      "Track click-throughs, traffic sources, and user interactions in real time.",
    image: "/images/track-link.jpeg",
  },
  {
    title: "Configure your webhook URL to receive events",
    content:
      "Set up a webhook endpoint to get notified whenever a link is clicked.",
    image: "/images/add-webhook.jpeg",
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
    image: "/images/get-links.jpeg",
  },
];
