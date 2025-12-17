import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Glide Network dashboard",
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login?redirect_to=/dashboard")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  let orders: unknown[] = []
  try {
    const { data } = await supabase
      .from("market_orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5)
    orders = data || []
  } catch {
    // Table might not exist yet
    orders = []
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/30">
        <DashboardContent user={user} profile={profile} orders={orders} />
      </main>
      <Footer />
    </>
  )
}
