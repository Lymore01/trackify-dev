export const LINK_EVENTS: string[] = [
    "link.created",
    "link.updated",
    "link.deleted",
    "link.clicked",
  ];
export const USER_EVENTS: string[] = ["user.created", "user.updated", "user.deleted"];

export const eventPayloadMap: Record<string, string> = {
  "user.created": `
    {
      "data": {
        "userId": "2uRDtVrgPzD3G04w7sL0CVD5OLh",
        "email": "example@example.com",
        "password": "12345678",
        "callbackUrl": "https://www.example.com/api/webhooks/trackify"
      }
    }
  `,
  "user.updated": `
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
  "user.deleted": `
    {
      "data": {
        "userId": "2uRDtVrgPzD3G04w7sL0CVD5OLh",
        "callbackUrl": "https://www.example.com/api/webhooks/trackify"
      }
    }
  `,
  "link.created": `
    {
      "data": {
        "linkId": "ABC123",
        "url": "https://www.example.com",
        "callbackUrl": "https://www.example.com/api/webhooks/trackify"
      }
    }
  `,
  "link.updated": `
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
  "link.deleted": `
    {
      "data": {
        "linkId": "ABC123",
        "callbackUrl": "https://www.example.com/api/webhooks/trackify"
      }
    }
  `,
  "link.clicked": `
    {
      "data": {
        "linkId": "ABC123",
        "clickTime": "2025-04-19T11:47:00Z",
        "callbackUrl": "https://www.example.com/api/webhooks/trackify"
      }
    }
  `
};

export  const mockRequest = {
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