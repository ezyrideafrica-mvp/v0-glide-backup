import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "Glide API is working",
    version: "v1",
  });
}
