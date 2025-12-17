import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, address, phone, categories } = body;

    const auth = await supabase.auth.getUser();

    if (!auth.data.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = auth.data.user.id;

    // Create provider profile
    const { error: providerError } = await supabase
      .from("service_providers")
      .insert({
        id: userId,
        business_name: businessName,
        address,
        phone,
      });

    if (providerError) throw providerError;

    // Insert categories
    if (categories?.length) {
      const categoryRows = categories.map((c: string) => ({
        provider_id: userId,
        category: c,
      }));

      const { error: catErr } = await supabase
        .from("service_provider_categories")
        .insert(categoryRows);

      if (catErr) throw catErr;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
