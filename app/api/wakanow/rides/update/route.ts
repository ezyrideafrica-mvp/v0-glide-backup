import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.WAKANOW_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.ride_id || !body.status) {
      return NextResponse.json(
        { error: "ride_id and status are required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("airport_rides")
      .update({ status: body.status })
      .eq("id", body.ride_id);

    if (error) {
      return NextResponse.json(
        { error: "Database error updating ride" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Ride status updated"
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
