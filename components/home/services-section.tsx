"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Sparkles, Wrench, Truck, ArrowRight } from "lucide-react"

const services = [
  {
    id: "market-runs",
    title: "Market Runs",
    description:
      "Get your groceries and market items delivered straight to your doorstep. Fast, reliable, and affordable.",
    icon: ShoppingBag,
    available: true,
    href: "/services/market-runs",
  },
  {
    id: "cleaning",
    title: "Cleaning Services",
    description:
      "Professional cleaning services for your home or office. Thorough, efficient, and trustworthy cleaners.",
    icon: Sparkles,
    available: false,
    href: "/services/cleaning",
  },
  {
    id: "repairs",
    title: "Home Repairs",
    description: "Expert technicians for all your home repair needs. Plumbing, electrical, carpentry, and more.",
    icon: Wrench,
    available: false,
    href: "/services/repairs",
  },
  {
    id: "delivery",
    title: "Delivery Services",
    description: "Quick and secure delivery of packages across the city. Track your items in real-time.",
    icon: Truck,
    available: false,
    href: "/services/delivery",
  },
]

export function ServicesSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            We offer a range of professional services to make your life easier. Choose from our available services
            below.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.id} className="relative flex flex-col transition-shadow hover:shadow-lg">
                {service.available && (
                  <Badge className="absolute right-4 top-4 bg-green-500 text-white hover:bg-green-600">Available</Badge>
                )}
                {!service.available && (
                  <Badge variant="secondary" className="absolute right-4 top-4">
                    Coming Soon
                  </Badge>
                )}
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant={service.available ? "default" : "outline"} className="w-full gap-2" asChild>
                    <Link href={service.href}>
                      {service.available ? "Book Now" : "Learn More"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
