import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.WAKANOW_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const required = [
      "wakanow_booking_ref",
      "passenger_name",
      "passenger_phone",
      "airport",
      "destination",
      "flight_time",
      "ride_type"
    ];

    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Save in DB
    const { data, error } = await supabaseAdmin
      .from("airport_rides")
      .insert({
        wakanow_booking_ref: body.wakanow_booking_ref,
        passenger_name: body.passenger_name,
        passenger_phone: body.passenger_phone,
        airport: body.airport,
        destination: body.destination,
        flight_time: body.flight_time,
        ride_type: body.ride_type,
        notes: body.notes || null,
        status: "pending"
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Database error saving ride" },
        { status: 500 }
      );
    }

    // TODO: send WhatsApp or email notification

    return NextResponse.json({
      success: true,
      message: "Ride booking received",
      ride_id: data.id
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
