import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { formSchema as endpointSchema } from "@/components/forms/add-endpoint";
import { generateSigningSecret } from "@/auth/webhooks/generateSigningSecret";
import { getCurrentUser } from "@/auth/core/getCurrentUser";

type Endpoint = z.infer<typeof endpointSchema>;

// register webhook
export async function POST(request: Request) {
  try {
    const body: Endpoint = await request.json();
    const user = await getCurrentUser({
      withFullUser: false,
    });

    // check if user exists
    if (user == null) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to register endpoint",
        },
        {
          status: 400,
        }
      );
    }

    const endpoint = await prisma.endpoint.create({
      data: {
        url: body.url,
        description: body.description,
        subscribedEvents: body.events as any,
        user: {
          connect: {
            id: user?.id,
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
      return NextResponse.json(
        {
          success: false,
          message: "Failed to register endpoint",
        },
        {
          status: 400,
        }
      );
    }

    // TODO: implement a function to ping the endpoint

    return NextResponse.json(
      {
        success: true,
        message: "Endpoint registered successfully",
        endpoint,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error registering enpoint", (error as Error).message);
    return NextResponse.json(
      {
        error: "Internal Server Error!",
      },
      {
        status: 500,
      }
    );
  }
}

// 201 - POST
// 200 - GET
