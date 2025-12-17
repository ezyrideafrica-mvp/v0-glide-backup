import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

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

  const pathname = req.nextUrl.pathname

  const PUBLIC_ROUTES = [
    "/",
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
    "/services/market",
    "/services/rides",
    "/services/errands",
    "/services/premium",
    "/services/events",
    "/contact",
    "/api",
  ]

  // Allow routes that start with these
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    if (user && (pathname === "/auth/login" || pathname === "/auth/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
    return res
  }

  if (!user) {
    const redirectUrl = new URL("/auth/login", req.url)
    redirectUrl.searchParams.set("redirect_to", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: "/((?!.*\\.(?:png|jpg|jpeg|svg|ico|woff|woff2|css|js)$).*)",
}
