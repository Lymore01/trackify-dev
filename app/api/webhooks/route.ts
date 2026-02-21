import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { formSchema as endpointSchema } from "@/components/forms/add-endpoint";
import { generateSigningSecret } from "@/auth/webhooks/generateSigningSecret";
import { getCurrentUser } from "@/auth/core/getCurrentUser";
import { EventsToSubscribe } from "@prisma/client";
import { apiResponse } from "@/lib/utils";
import { UnauthorizedError, AppError } from "@/lib/exceptions";

export type Endpoint = z.infer<typeof endpointSchema>;

// register webhook
export async function POST(request: Request) {
  try {
    const body: Endpoint = await request.json();
    const user = await getCurrentUser({
      withFullUser: false,
    });

    if (!user) {
      throw new UnauthorizedError("User session not found");
    }

    const existingEndpoint = await prisma.endpoint.findFirst({
      where: {
        url: body.url,
        appId: body.app as string,
      },
    });

    if (existingEndpoint) {
      throw new AppError(
        "A webhook with this URL is already registered for this app",
        400,
      );
    }

    const endpoint = await prisma.endpoint.create({
      data: {
        url: body.url,
        description: body.description as string,
        subscribedEvents: body.events as EventsToSubscribe[],
        user: {
          connect: {
            id: user.id,
          },
        },
        app: {
          connect: {
            id: body.app,
          },
        },
        signingSecret: await generateSigningSecret(),
      },
      select: {
        url: true,
        description: true,
        subscribedEvents: true,
      },
    });

    if (!endpoint) {
      throw new AppError("Failed to register endpoint", 400);
    }

    return apiResponse(
      { message: "Endpoint registered successfully", endpoint },
      201,
    );
  } catch (error) {
    console.error("Error registering endpoint:", error);
    return apiResponse(error);
  }
}

// 201 - POST
// 200 - GET
