import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

function authenticate(req: NextRequest) {
  const header = req.headers.get("authorization");
  if (!header) return false;
  return header === `Bearer ${process.env.GLIDE_API_SECRET_KEY}`;
}

export async function GET(req: NextRequest) {
  try {
    if (!authenticate(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch ALL rides (since /api/v1/rides has NO :id)
    const { data, error } = await supabase
      .from("rides")
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      rides: data
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
