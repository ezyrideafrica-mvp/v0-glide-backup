import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  return NextResponse.json(ip);
}
