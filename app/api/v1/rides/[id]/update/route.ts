import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

function authenticate(req: NextRequest) {
  const header = req.headers.get("authorization");
  if (!header) return false;
  return header === `Bearer ${process.env.GLIDE_API_SECRET_KEY}`;
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!authenticate(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Next.js 16 wraps params in a Promise
    const { id } = await context.params;

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("rides")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fire and forget webhook
    fetch(process.env.WAKANOW_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "ride.status_updated",
        ride_id: id,
        status,
      }),
    }).catch(() => null);

    return NextResponse.json({
      success: true,
      ride_id: id,
      new_status: status,
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
