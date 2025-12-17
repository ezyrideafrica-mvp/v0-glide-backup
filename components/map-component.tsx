"use client"

import { MapPin } from "lucide-react"
import Image from "next/image"

interface MapComponentProps {
  pickup?: string
  dropoff?: string
  className?: string
}

export function MapComponent({ pickup, dropoff, className = "" }: MapComponentProps) {
  return (
    <div className={`relative w-full h-full bg-gray-100 overflow-hidden rounded-lg border border-border ${className}`}>
      {/* Placeholder Map Background - In a real app, this would be Google Maps or Mapbox */}
      <div className="absolute inset-0 opacity-50">
        <Image
          src="/hero-image.jpg" // Using hero image as placeholder texture for now, or a pattern
          alt="Map Background"
          fill
          className="object-cover grayscale opacity-20"
        />
        <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/data=LyN1dF9tYXA7MTQ1O3ZlcnNpb249Ni4wO2ltZ19zcmM9cm9hZF9tYXA7eD0xNDt5PTE0O3o9NQ')] bg-repeat opacity-10"></div>

        {/* Grid pattern to simulate map streets */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Map UI Elements */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-end">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-medium text-gray-500 shadow-sm">
            Map View
          </div>
        </div>

        {/* Simulated Route */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Connection Line */}
          <div className="absolute w-48 h-1 bg-primary/30 rotate-45 transform origin-center"></div>

          {/* Pickup Pin */}
          <div
            className="absolute transform -translate-x-16 -translate-y-16 flex flex-col items-center animate-bounce"
            style={{ animationDuration: "2s" }}
          >
            <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold mb-1 text-primary whitespace-nowrap">
              {pickup || "Pickup Location"}
            </div>
            <MapPin className="w-8 h-8 text-primary fill-primary/20" />
            <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
          </div>

          {/* Dropoff Pin */}
          <div
            className="absolute transform translate-x-16 translate-y-16 flex flex-col items-center animate-bounce"
            style={{ animationDuration: "2.5s" }}
          >
            <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold mb-1 text-secondary whitespace-nowrap">
              {dropoff || "Dropoff Location"}
            </div>
            <MapPin className="w-8 h-8 text-secondary fill-secondary/20" />
            <div className="w-2 h-2 bg-secondary rounded-full mt-1"></div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-sm">
            <div className="text-[10px] text-gray-500">© OpenStreetMap contributors</div>
          </div>
        </div>
      </div>
    </div>
  )
}
