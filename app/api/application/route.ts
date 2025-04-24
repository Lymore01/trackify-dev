import { getCurrentUser } from "@/auth/core/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: {
      appName: string;
    } = await request.json();
    const { appName } = body;
    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create application",
        },
        {
          status: 400,
        }
      );
    }

    const application = await prisma.app.create({
      data: {
        name: appName,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create application",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Created application successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating application", (error as Error).message);
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

// get applications
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    });

    const applications = await prisma.app.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        name: true,
        plan: true,
        updatedAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!applications) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch applications",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(applications, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching applications", (error as Error).message);
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
