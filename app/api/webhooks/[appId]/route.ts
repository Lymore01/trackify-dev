import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// get webhooks for a specific app

type Filter = {
  id?: string;
};

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { appId: string };
  }
) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const endpoint = searchParams.get("endpoint");
    const appId = params.appId;

    let filters: Filter = {};

    if (endpoint) {
      filters["id"] = endpoint;
    } else {
      filters = {};
    }

    const webhooks = await prisma.endpoint.findMany({
      where: {
        appId,
        ...filters,
      },
    });
    if (!webhooks) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch endpoints",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Endpoints fetched successfully",
        webhooks,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error fetching endpoints", (error as Error).message);
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
