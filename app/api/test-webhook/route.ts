import { NextRequest, NextResponse } from "next/server";

// Server-side proxy for webhook test requests.
// The browser cannot directly POST to external URLs (CORS). This route
// forwards the request server-side where CORS doesn't apply.
export async function POST(req: NextRequest) {
  try {
    const { endpointUrl, payload, signature } = await req.json();

    if (!endpointUrl || !payload) {
      return NextResponse.json(
        { error: "Missing endpointUrl or payload" },
        { status: 400 },
      );
    }

    const start = Date.now();

    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "trackify-webhook-signature": signature ?? "",
      },
      body: JSON.stringify(payload),
    });

    const durationMs = Date.now() - start;

    // Read body as text first — the stream can only be consumed once,
    // so calling response.json() then response.text() on failure loses the body
    const rawBody = await response.text();
    let responseBody: any;
    try {
      responseBody = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      responseBody = rawBody || null;
    }

    const url = new URL(endpointUrl);

    return NextResponse.json({
      summary: {
        method: "POST",
        pathName: url.pathname || "/",
        statusCode: response.status,
        time: `${durationMs}ms`,
      },
      response: responseBody,
    });
  } catch (error: any) {
    console.error("POST /api/test-webhook error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to reach endpoint" },
      { status: 502 },
    );
  }
}
