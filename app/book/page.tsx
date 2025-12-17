"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/navbar";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function BookingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    service_id: "",
    pickup_location: "",
    dropoff_location: "",
    scheduled_date: "",
  });
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push("/auth/login");
          return;
        }

        setUser(user);

        const { data: servicesData } = await supabase
          .from("services")
          .select("*")
          .order("created_at", { ascending: false });
        
        setServices(servicesData || []);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    setMessage("");

    try {
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        service_id: formData.service_id,
        pickup_location: formData.pickup_location,
        dropoff_location: formData.dropoff_location,
        scheduled_date: formData.scheduled_date || null,
        status: "pending",
      });

      if (error) throw error;

      setMessage("Booking successful! Check your dashboard for details.");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to create booking"
      );
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
        
      </>
    );
  }
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p>Please sign in to book a service</p>
        </div>
        
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/dashboard" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Dashboard
          </Link>

          <h1 className="text-4xl font-bold mb-2">Book a Service</h1>
          <p className="text-muted-foreground mb-8">
            Select your service and provide location details to proceed
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Fill in your booking information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="service_id">Service</Label>
                  <select
                    id="service_id"
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="">Select a service</option>
                    {services.map((service: any) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup_location">Pickup Location</Label>
                  <Input
                    id="pickup_location"
                    name="pickup_location"
                    placeholder="Enter pickup location"
                    value={formData.pickup_location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dropoff_location">Dropoff Location</Label>
                  <Input
                    id="dropoff_location"
                    name="dropoff_location"
                    placeholder="Enter dropoff location"
                    value={formData.dropoff_location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scheduled_date">Schedule for Later (Optional)</Label>
                  <Input
                    id="scheduled_date"
                    name="scheduled_date"
                    type="datetime-local"
                    value={formData.scheduled_date}
                    onChange={handleInputChange}
                  />
                </div>

                {message && (
                  <p className={`text-sm ${message.includes("successful") ? "text-green-600" : "text-destructive"}`}>
                    {message}
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={isBooking}>
                  {isBooking ? "Processing..." : "Confirm Booking"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
    </>
  );
}
