import { apiResponse } from "@/lib/utils";
import { getClickTrackingPerShortId } from "@/services/trackingServices";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const linkId = searchParams.get("id");
    if (!linkId) {
      return apiResponse({ error: "Missing link ID" }, 400);
    }

    const clicks = await getClickTrackingPerShortId(linkId);

    return apiResponse({ clicks }, 200);
  } catch (error) {
    console.error("GET /api/stats?id={id} error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}