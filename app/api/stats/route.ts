import { apiResponse } from "@/lib/utils";
import { getClickTrackingPerShortId } from "@/services/trackingServices";
import { ValidationError } from "@/lib/exceptions";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const linkId = searchParams.get("id");
    if (!linkId) {
      throw new ValidationError("Missing link ID");
    }

    const clicks = await getClickTrackingPerShortId(linkId);

    return apiResponse(clicks, 200);
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return apiResponse(error);
  }
}
