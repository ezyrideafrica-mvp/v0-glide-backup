"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  const isActive = (href: string) => pathname === href

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Glide Network" width={132} height={64} className="h-14 w-auto" priority />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/#about") ? "text-primary" : "text-foreground"
              }`}
            >
              About
            </Link>

            <Link
              href="/#services"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/#services") ? "text-primary" : "text-foreground"
              }`}
            >
              Services
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-foreground"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* DESKTOP AUTH BUTTONS - Conditional rendering based on auth state */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="h-9 w-24 bg-gray-100 animate-pulse rounded-md" />
            ) : user ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  asChild
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Link href="/auth/provider">Service Provider</Link>
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>

                <Button asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* MOBILE NAV LINKS - Updated for auth state */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4 animate-in fade-in slide-in-from-top-2">
            <Link href="/#about" className="block text-sm text-foreground hover:text-primary">
              About
            </Link>

            <Link href="/#services" className="block text-sm text-foreground hover:text-primary">
              Services
            </Link>

            <Link href="/contact" className="block text-sm text-foreground hover:text-primary">
              Contact
            </Link>

            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" onClick={handleSignOut} className="w-full">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <Link href="/auth/provider">Service Provider</Link>
                  </Button>

                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/auth/login">Sign In</Link>
                  </Button>

                  <Button asChild className="w-full">
                    <Link href="/auth/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
