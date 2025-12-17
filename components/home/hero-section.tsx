"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function HeroSection() {
  const features = [
    "Trusted service providers",
    "Fast and reliable delivery",
    "Secure payment options",
    "24/7 customer support",
  ]

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/2 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Now accepting orders</span>
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Your trusted platform for <span className="text-primary">professional services</span>
            </h1>

            <p className="max-w-lg text-pretty text-lg text-muted-foreground">
              Connect with reliable service providers for all your needs. From market runs to home services, we have got
              you covered with quality and convenience.
            </p>

            <ul className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="gap-2">
                <Link href="/services">
                  Book a Service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/provider/register">Become a Provider</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square">
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8">
                <div className="h-full w-full rounded-2xl border border-border bg-card p-6 shadow-xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10" />
                      <div className="space-y-1">
                        <div className="h-4 w-32 rounded bg-muted" />
                        <div className="h-3 w-24 rounded bg-muted" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 w-full rounded bg-muted" />
                      <div className="h-3 w-4/5 rounded bg-muted" />
                      <div className="h-3 w-3/5 rounded bg-muted" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-primary/10 p-4">
                        <div className="h-8 w-8 rounded bg-primary/20" />
                        <div className="mt-2 h-3 w-16 rounded bg-muted" />
                      </div>
                      <div className="rounded-lg bg-accent/10 p-4">
                        <div className="h-8 w-8 rounded bg-accent/20" />
                        <div className="mt-2 h-3 w-16 rounded bg-muted" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating cards */}
              <div className="absolute -right-4 top-1/4 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Order Completed</p>
                    <p className="text-xs text-muted-foreground">Market Run #1234</p>
                  </div>
                </div>
              </div>
              <div className="absolute -left-4 bottom-1/4 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg font-bold text-primary">4.9</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Excellent Rating</p>
                    <p className="text-xs text-muted-foreground">500+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
