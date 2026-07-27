import { readFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const CERTIFICATES: Record<string, string> = {
  "iso-9001": "iso-9001-skinfinity.pdf",
  ieb: "ieb-accreditation-skinfinity.pdf",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const filename = CERTIFICATES[id];

  if (!filename) {
    return new NextResponse("Not found", { status: 404 });
  }

  const host = request.headers.get("host");
  const referer = request.headers.get("referer");

  if (host && referer && !referer.includes(host)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const filePath = path.join(process.cwd(), "certificates", filename);
    const buffer = await readFile(filePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
