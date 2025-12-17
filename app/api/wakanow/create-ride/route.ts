import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: Request) {
  const token = req.headers.get("authorization");

  if (token !== `Bearer ${process.env.WAKANOW_API_KEY}`) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const required = ["passenger_name", "phone_number", "pickup_airport", "destination", "flight_number", "pickup_time"];
  for (let field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { status: "error", message: `Missing field: ${field}` },
        { status: 400 }
      );
    }
  }

  const ride_id = `ride_${Math.random().toString(36).substring(2, 10)}`;

  await supabase.from("rides").insert({
    ride_id,
    ...body,
    status: "request_received"
  });

  return NextResponse.json({
    status: "success",
    ride_id,
    message: "Ride request received successfully."
  });
}
