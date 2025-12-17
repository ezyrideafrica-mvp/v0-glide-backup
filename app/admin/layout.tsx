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
    redirect("/auth/login?redirect_to=/admin")
  }

  // Check if user has admin role
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin" && profile?.role !== "super_admin") {
    redirect("/unauthorized")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar userRole={profile?.role} />
      <main className="flex-1 p-8 ml-64">{children}</main>
    </div>
  )
}
