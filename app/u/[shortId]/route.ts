// redirect user

import { fetchUrl } from "@/services/urlServices";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortId: string }> }
) {
  const { shortId } = await params;
  if (!shortId) {
    return NextResponse.redirect("/");
  }
  const url = await fetchUrl({
    shortId: shortId,
  });

  const safeUrl = ensureValidUrl(url[0].original || "");
  
  return NextResponse.redirect(new URL(safeUrl), { status: 302 });
}

function ensureValidUrl(url: string) {
  try {
    new URL(url);
    return url;
  } catch {
    return `https://${url}`;
  }
}
