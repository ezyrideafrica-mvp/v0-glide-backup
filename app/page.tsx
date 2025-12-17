"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { DecorativeShapes } from "@/components/decorative-shapes"
import { MapPin, Navigation, Search, ShoppingCart, Car, Package } from "lucide-react"
import { ComingSoonModal } from "@/components/coming-soon-modal"

const services = [
  {
    id: 1,
    name: "City Rides",
    description: "Fast, safe, and reliable movement across Nigeria through trained riders and verified operators",
    icon: <Car className="w-12 h-12 text-secondary" />,
    price: "From ₦500",
    active: false,
  },
  {
    id: 2,
    name: "Market Runs",
    description: "Professional market agents for fresh groceries, bulk items, and essentials",
    icon: <ShoppingCart className="w-12 h-12 text-secondary" />,
    price: "Variable",
    active: true,
  },
  {
    id: 3,
    name: "On-Demand Errands",
    description: "Pickups, drop-offs, store-to-home delivery, and small parcel movement",
    icon: <Package className="w-12 h-12 text-secondary" />,
    price: "Variable",
    active: false,
  },
]

const aboutValues = [
  {
    icon: (
      <svg className="w-12 h-12 text-secondary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Fast Delivery",
    description: "Quick turnaround times with professional operators and real-time tracking",
  },
  {
    icon: (
      <svg className="w-12 h-12 text-secondary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
    ),
    title: "Safe & Secure",
    description: "Verified riders, secure routes, and comprehensive insurance coverage",
  },
  {
    icon: (
      <svg className="w-12 h-12 text-secondary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
      </svg>
    ),
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist with any queries or issues",
  },
]

function LocationInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder: string
}) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = [
    "Lekki Phase 1, Lagos",
    "Victoria Island, Lagos",
    "Ikeja City Mall, Ikeja",
    "Surulere, Lagos",
    "Yaba, Lagos",
    "Banana Island, Ikoyi",
    "Maryland Mall, Lagos",
  ].filter((s) => s.toLowerCase().includes(value.toLowerCase()) && value.length > 0)

  return (
    <div className="space-y-2 relative z-50">
      <label className="block text-sm font-semibold text-primary">{label}</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        {value && (
          <div className="absolute right-3 top-3.5">
            <Navigation className="h-5 w-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
          </div>
        )}
      </div>

      {showSuggestions && value.length > 0 && (
        <div className="absolute z-100 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onChange(suggestion)
                    setShowSuggestions(false)
                  }}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 text-sm text-gray-700 transition-colors"
                >
                  <div className="bg-gray-100 p-1.5 rounded-full">
                    <MapPin className="h-4 w-4 text-gray-500" />
                  </div>
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
              <Search className="h-4 w-4" />
              Searching for "{value}"...
            </div>
          )}
          <div className="bg-gray-50 px-4 py-2 text-xs text-gray-400 border-t flex justify-between items-center">
            <span>Powered by Google Maps</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedService, setSelectedService] = useState("")
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [comingSoonService, setComingSoonService] = useState("")
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
        console.error("Error checking user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [supabase.auth])

  const handleBooking = () => {
    if (selectedService && pickupLocation) {
      if (selectedService === "Market Runs") {
        const params = new URLSearchParams()
        if (pickupLocation) params.set("pickup", pickupLocation)
        if (dropoffLocation) params.set("dropoff", dropoffLocation)
        router.push(`/services/market?${params.toString()}`)
      } else {
        setComingSoonService(selectedService)
        setShowComingSoon(true)
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="relative w-full overflow-hidden bg-linear-to-r from-primary via-blue-700 to-secondary py-20 md:py-40">
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <Image
              src="/logo.png"
              alt=""
              width={1200}
              height={1200}
              className="w-full h-full object-contain max-w-6xl animate-fade-in"
              aria-hidden="true"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="text-white space-y-6 animate-slide-in-left">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                    Your One Stop to All Services
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 text-pretty">
                    Experience seamless transportation, shopping, delivery, and event logistics with Glide Network.
                    Fast, reliable, and professional services across Lagos.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {user ? (
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 font-semibold transition-transform hover:scale-105"
                      asChild
                    >
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="lg"
                        className="bg-primary text-white hover:bg-primary/90 font-semibold transition-transform hover:scale-105"
                        asChild
                      >
                        <Link href="/auth/register">Get Started</Link>
                      </Button>
                      <Button
                        size="lg"
                        className="bg-primary text-white hover:bg-primary/90 font-semibold transition-transform hover:scale-105"
                        asChild
                      >
                        <Link href="/auth/login">Sign In</Link>
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-delay">
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-lg bg-black border border-white/20 hover:bg-gray-900 transition-all hover:scale-105 shadow-lg"
                  >
                    <Image
                      src="/playstore-logo.png"
                      alt="Google Play Store"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                    <div className="text-left text-white">
                      <div className="text-xs">Download on</div>
                      <div className="text-sm font-bold">Google Play</div>
                    </div>
                  </a>
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-lg bg-black border border-white/20 hover:bg-gray-900 transition-all hover:scale-105 shadow-lg"
                  >
                    <Image src="/appstore-logo.png" alt="Apple App Store" width={32} height={32} className="w-8 h-8" />
                    <div className="text-left text-white">
                      <div className="text-xs">Download on</div>
                      <div className="text-sm font-bold">App Store</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="relative h-96 md:h-[750px] hidden md:flex items-center justify-center animate-slide-in-right">
                <Image
                  src="/logo.png"
                  alt="Glide Network Mobile App"
                  width={900}
                  height={1000}
                  className="object-contain drop-shadow-2xl"
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-visible">
          <DecorativeShapes />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="space-y-12 animate-fade-in">
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-6xl font-extrabold text-primary">Take a Glide</h2>
                <p className="text-lg md:text-xl text-foreground/70 font-semibold">
                  Get fast, affordable, and trusted services in your city - all in one app.
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6 animate-slide-up relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">Choose a Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
                    >
                      <option value="">Select a service...</option>
                      <option value="City Rides">City Rides (Coming Soon)</option>
                      <option value="Market Runs">Market Runs</option>
                      <option value="On-Demand Errands">On-Demand Errands (Coming Soon)</option>
                      <option value="Premium Mobility">Premium Mobility (Coming Soon)</option>
                      <option value="Event Mobility Support">Event Mobility Support (Coming Soon)</option>
                    </select>
                  </div>

                  <LocationInput
                    label="Your Location"
                    value={pickupLocation}
                    onChange={setPickupLocation}
                    placeholder="Enter pickup location"
                  />
                </div>

                {selectedService && pickupLocation && (
                  <div className="space-y-2 animate-slide-down relative z-10">
                    <LocationInput
                      label="Destination (if applicable)"
                      value={dropoffLocation}
                      onChange={setDropoffLocation}
                      placeholder="Enter destination"
                    />
                  </div>
                )}

                {selectedService && pickupLocation ? (
                  <Button
                    size="lg"
                    className="w-full bg-primary text-white hover:bg-primary/90 font-semibold transition-transform hover:scale-105"
                    onClick={handleBooking}
                  >
                    Continue Booking
                  </Button>
                ) : (
                  <Button size="lg" disabled className="w-full">
                    Select Service & Location
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <DecorativeShapes />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">About Glide Network</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                We're revolutionizing urban mobility and logistics in Lagos with innovative, reliable, and
                customer-centric services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aboutValues.map((value, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-md hover:shadow-lg transition-all hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="mb-4 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                      {value.icon}
                    </div>
                    <CardTitle className="text-2xl text-primary">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <DecorativeShapes />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Our Services</h2>
              <p className="text-lg text-foreground/70">
                Comprehensive solutions for all your transportation and logistics needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {services.map((service, index) => (
                <Card
                  key={service.id}
                  className="hover:shadow-lg transition-all hover:scale-105 border-0 shadow-md animate-slide-up relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {!service.active && (
                    <div className="absolute top-3 right-3 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                      Coming Soon
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-4 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                      {service.icon}
                    </div>
                    <CardTitle className="text-primary">{service.name}</CardTitle>
                    <CardDescription className="text-primary/80 font-semibold">{service.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center animate-fade-in">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 font-semibold transition-transform hover:scale-105"
                asChild
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <DecorativeShapes />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">How It Works</h2>
              <p className="text-lg text-foreground/70">Get started with Glide Network in 4 simple steps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Create Account", description: "Sign up with your email and phone number" },
                { step: 2, title: "Choose Service", description: "Select from our range of services" },
                { step: 3, title: "Enter Location", description: "Provide pickup and delivery details" },
                { step: 4, title: "Confirm & Pay", description: "Review and complete your booking" },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="text-center space-y-4 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto animate-pulse">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        serviceName={comingSoonService}
      />
    </>
  )
}
