import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
  } catch (error) {
    console.error("Error adding api enpoint", (error as Error).message);
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
