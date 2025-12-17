import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?redirect_to=/admin")
  }

  // Check if user has admin role
  let profile = null
  try {
    const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single()
    profile = data
  } catch {
    // Profile table might not exist
  }

  const adminRoles = ["owner", "dev_admin", "marketing_admin", "sales_admin"]
  if (!profile?.role || !adminRoles.includes(profile.role)) {
    redirect("/unauthorized")
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar userRole={profile?.role} />
      <main className="flex-1 p-8 ml-64">{children}</main>
    </div>
  )
}
