"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ComingSoonModal } from "@/components/coming-soon-modal"
import { ShoppingCart, Car, Package, Crown, Calendar } from "lucide-react"

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser()
        setUser(currentUser)

        const { data } = await supabase.from("services").select("*").order("created_at", { ascending: false })
        setServices(data || [])
      } catch (error) {
        console.error("Error loading services:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [supabase])

  const serviceIcons: { [key: string]: React.ReactNode } = {
    "City Rides": <Car className="w-10 h-10 text-primary" />,
    "Market Runs": <ShoppingCart className="w-10 h-10 text-primary" />,
    "On-Demand Errands": <Package className="w-10 h-10 text-primary" />,
    "Premium Mobility": <Crown className="w-10 h-10 text-primary" />,
    "Event Mobility Support": <Calendar className="w-10 h-10 text-primary" />,
  }

  const handleServiceClick = (serviceName: string) => {
    if (serviceName === "Market Runs") {
      return
    }
    setSelectedService(serviceName)
    setShowComingSoon(true)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-white/90">
              Comprehensive solutions for all your transportation and logistics needs
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                <p className="mt-4 text-gray-500">Loading services...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service: any) => {
                  const isMarketRuns = service.name === "Market Runs"

                  return (
                    <Card
                      key={service.id}
                      className="hover:shadow-lg transition flex flex-col relative overflow-hidden"
                    >
                      {!isMarketRuns && (
                        <div className="absolute top-3 right-3 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                          Coming Soon
                        </div>
                      )}
                      <CardHeader>
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                          {serviceIcons[service.name] || <Package className="w-10 h-10 text-primary" />}
                        </div>
                        <CardTitle className="text-2xl">{service.name}</CardTitle>
                        <CardDescription className="text-primary font-semibold text-base">
                          {service.price_info}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between">
                        <p className="text-foreground mb-6 leading-relaxed">{service.description}</p>
                        {isMarketRuns ? (
                          <Button className="w-full" asChild>
                            <Link href="/services/market">Book Now</Link>
                          </Button>
                        ) : (
                          <Button
                            className="w-full bg-transparent"
                            variant="outline"
                            onClick={() => handleServiceClick(service.name)}
                          >
                            Coming Soon
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {user
                ? "Book a service now and experience the Glide Network difference."
                : "Sign up today and experience the Glide Network difference. Fast, reliable, and professional services."}
            </p>
            <Button size="lg" asChild>
              <Link href={user ? "/services/market" : "/auth/register"}>
                {user ? "Book Market Runs" : "Create Account"}
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} serviceName={selectedService} />
    </>
  )
}
