import { NextResponse } from "next/server"
import supabase from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      items,
      dropoff,
      deliveryDate,
      estimate,
      userId
    } = body

    if (!items || !items.length) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("market_orders")
      .insert([
        {
          items,
          dropoff,
          delivery_date: deliveryDate,
          estimate,
          user_id: userId || null,
          status: "pending",
          vendor_id: 1,
          created_at: new Date()
        }
      ])
      .select()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const order = data?.[0]

    // -----------------------------
    // BUILD WHATSAPP MESSAGE
    // -----------------------------
    const message = encodeURIComponent(
      `🛒 *New Market Run Order*\n\n` +
      `📍 *Dropoff:* ${dropoff}\n` +
      `📅 *Delivery Date:* ${deliveryDate}\n\n` +
      `📝 *Items:*\n` +
      items.map((i: any) => `• ${i.name} - ${i.quantity} (${i.notes || "-"})`).join("\n") +
      `\n\n💰 *Estimated Total:* ₦${estimate?.total?.toLocaleString()}\n` +
      `\nOrder ID: ${order.id}`
    )

    // Your vendor WhatsApp link
    const vendorLink = `https://wa.link/55z2rb?text=${message}`

    return NextResponse.json(
      {
        success: true,
        order,
        vendorLink
      },
      { status: 200 }
    )

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
