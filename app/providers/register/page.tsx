"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "Caterers",
  "Household",
  "Market",
  "Large kitchen outlets",
  "Small kitchen outlets",
];

export default function ProviderRegisterPage() {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch("/api/providers/register", {
      method: "POST",
      body: JSON.stringify({
        businessName,
        address,
        phone,
        categories,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    router.push("/providers/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-semibold">Become a Service Provider</h1>

      <div className="space-y-4">
        <div>
          <Label>Business Name</Label>
          <Input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>

        <div>
          <Label>Address</Label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <Label>Phone</Label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <Label>Categories</Label>
          <div className="grid grid-cols-1 gap-2 mt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`border p-2 rounded ${
                  categories.includes(cat)
                    ? "bg-primary text-white"
                    : "bg-background"
                }`}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <Button disabled={loading} onClick={handleSubmit} className="w-full">
          {loading ? "Submitting..." : "Register"}
        </Button>
      </div>
    </div>
  );
}
