import { apiResponse } from "@/lib/utils";
import { deleteUrl, updateUrl } from "@/services/urlServices";
import { urlSchema } from "@/validations/urlValidations";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return apiResponse({ error: "Invalid ID" }, 400);
    }

    await deleteUrl(id);

    return apiResponse({ success: true, message: "URL deleted" }, 200);
  } catch (error) {
    console.error("DELETE /api/{id}/url error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    console.log("ID:", id);

    if (!id) {
      return apiResponse({ error: "Invalid ID" }, 400);
    }

    const body = await req.json();

    const { success, data: updateData } = urlSchema.partial().safeParse(body);

    if (!success) {
      return apiResponse({ error: "Invalid request body" }, 400);
    }

    await updateUrl(id, updateData);

    return apiResponse({ success: true, message: "URL updated" }, 200);
  } catch (error) {
    console.error("PUT /api/{id}/url error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}
