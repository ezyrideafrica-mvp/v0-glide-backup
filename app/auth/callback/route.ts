import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    // Token expired, invalid, already used, etc.
    if (error.message.includes("expired")) {
      return NextResponse.redirect(new URL("/auth/expired", request.url));
    }

    return NextResponse.redirect(new URL("/auth/error", request.url));
  }

  // Success
  return NextResponse.redirect(new URL("/auth/success", request.url));
}
