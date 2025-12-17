"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { ComingSoonModal } from "@/components/coming-soon-modal"
import { ShoppingCart, Car, Package, Crown, Calendar } from "lucide-react"

const SERVICES = [
  {
    id: "market-runs",
    name: "Market Runs",
    description:
      "Professional agents shop for fresh groceries and essentials from local markets and deliver to your doorstep.",
    price_info: "From ₦2,500",
    icon: ShoppingCart,
    active: true,
  },
  {
    id: "city-rides",
    name: "City Rides",
    description:
      "Reliable transportation across Lagos with professional drivers. Safe, comfortable, and always on time.",
    price_info: "From ₦1,500",
    icon: Car,
    active: false,
  },
  {
    id: "errands",
    name: "On-Demand Errands",
    description: "Need something done? Our agents can handle pickups, deliveries, and various errands across the city.",
    price_info: "From ₦2,000",
    icon: Package,
    active: false,
  },
  {
    id: "premium",
    name: "Premium Mobility",
    description: "Executive transportation for business meetings, airport transfers, and special occasions.",
    price_info: "From ₦10,000",
    icon: Crown,
    active: false,
  },
  {
    id: "events",
    name: "Event Mobility Support",
    description: "Complete logistics support for weddings, corporate events, and large gatherings.",
    price_info: "Custom Quote",
    icon: Calendar,
    active: false,
  },
]

export default function ServicesPage() {
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName)
    setShowComingSoon(true)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-primary py-16 text-white">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => {
                const Icon = service.icon
                const isActive = service.active

                return (
                  <Card key={service.id} className="hover:shadow-lg transition flex flex-col relative overflow-hidden">
                    {!isActive && (
                      <div className="absolute top-3 right-3 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                        Coming Soon
                      </div>
                    )}
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{service.name}</CardTitle>
                      <CardDescription className="text-primary font-semibold text-base">
                        {service.price_info}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <p className="text-foreground mb-6 leading-relaxed">{service.description}</p>
                      {isActive ? (
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book Market Runs now and experience the Glide Network difference. Fast, reliable, and professional
              services.
            </p>
            <Button size="lg" asChild>
              <Link href="/services/market">Book Market Runs</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />

      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} serviceName={selectedService} />
    </>
  )
}
