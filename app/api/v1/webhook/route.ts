import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Webhook received by Wakanow:", body);

    return NextResponse.json({
      received: true,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
