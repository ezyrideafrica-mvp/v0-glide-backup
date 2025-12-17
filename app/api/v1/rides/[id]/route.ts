import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

function authenticate(req: NextRequest) {
  const header = req.headers.get("authorization");
  if (!header) return false;
  return header === `Bearer ${process.env.GLIDE_API_SECRET_KEY}`;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!authenticate(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // MUST await due to Next.js 16 API change
    const { id } = await context.params;

    const { data, error } = await supabase
      .from("rides")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Ride not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ride_id: data.id,
      status: data.status,
      passenger_name: data.passenger_name,
      pickup_airport: data.pickup_airport,
      pickup_time: data.pickup_time,
      flight_number: data.flight_number,
      destination: data.destination,
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
