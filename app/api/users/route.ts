import axiosInstance from "@/lib/axios";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    try {
        const response = await axiosInstance.get("/api/users");
    } catch (error) {
        console.error("Error fetching users", (error as Error).message);
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