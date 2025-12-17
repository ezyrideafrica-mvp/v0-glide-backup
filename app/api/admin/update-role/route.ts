import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(req: Request) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get() {
            return "";
          },
          set() {},
          remove() {},
        },
      }
    );

    const { user_id, role } = await req.json();

    if (!user_id || !role) {
      return NextResponse.json(
        { error: "Missing user_id or role" },
        { status: 400 }
      );
    }

    // 1️⃣ Update Auth app_metadata.role
    const { error: authError } = await supabase.auth.admin.updateUserById(
      user_id,
      { app_metadata: { role } }
    );

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 500 }
      );
    }

    // 2️⃣ Update Profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", user_id);

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
