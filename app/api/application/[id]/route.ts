import { getCurrentUser } from "@/auth/core/getCurrentUser";
import { apiResponse } from "@/lib/utils";
import { deleteApp, updateApp } from "@/services/appServices";
import { createAppSchema } from "@/validations/appValidations";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { id } = params;

    const payload = createAppSchema.safeParse(body);
    if (!payload.success) {
      return apiResponse(
        { success: false, message: "Invalid request body" },
        400
      );
    }
    const { data: app } = payload;

    await updateApp(id, app.appName);
    return apiResponse(
      { success: true, name: app.appName, message: "Application updated" },
      200
    );
  } catch (error) {
    console.error("PUT /api/app/{id} error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    });

    if (!user) {
      return apiResponse({ error: "User not found" }, 401);
    }

    await deleteApp(id, user.id);
    return apiResponse({ success: true, message: "Application deleted" }, 200);
  } catch (error) {
    console.error("DELETE /api/app/{id} error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}
