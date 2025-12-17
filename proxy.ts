import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const isSupabaseConfigured = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname

  const PUBLIC_ROUTES = [
    "/",
    "/login",
    "/register",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/callback",
    "/auth/check-email",
    "/auth/success",
    "/auth/error",
    "/auth/expired",
    "/auth/provider",
    "/services",
    "/contact",
    "/about",
    "/api",
    "/unauthorized",
  ]

  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
    pathname.startsWith("/services/")

  if (!isSupabaseConfigured()) {
    if (isPublicRoute) {
      return res
    }
    // For protected routes without Supabase, redirect to login
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/profile")) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirect_to", pathname)
      redirectUrl.searchParams.set("message", "auth_required")
      return NextResponse.redirect(redirectUrl)
    }
    return res
  }

  // Supabase is configured - proceed with auth checks
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value ?? "",
        set: (name: string, value: string, options) => {
          res.cookies.set(name, value, options)
        },
        remove: (name: string) => {
          res.cookies.delete(name)
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect logged-in users away from auth pages
  if (
    user &&
    (pathname === "/login" || pathname === "/register" || pathname === "/auth/login" || pathname === "/auth/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Allow public routes
  if (isPublicRoute) {
    return res
  }

  // Redirect unauthenticated users to login
  if (!user) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirect_to", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Admin role check
  if (pathname.startsWith("/admin")) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    const adminRoles = ["owner", "dev_admin", "marketing_admin", "sales_admin"]
    if (!profile?.role || !adminRoles.includes(profile.role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  }

  return res
}

export const config = {
  matcher: "/((?!.*\\.(?:png|jpg|jpeg|svg|ico|woff|woff2|css|js)$).*)",
}
