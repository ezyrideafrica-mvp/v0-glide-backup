"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProviderRegistration() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    "Caterers",
    "Household",
    "Market",
    "Large kitchen outlets",
    "Small kitchen outlets",
  ];

  async function handleSubmit() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in.");
      router.push("/auth/login");
      return;
    }

    const { data: provider, error } = await supabase
      .from("service_providers")
      .insert({
        user_id: user.id,
        business_name: businessName,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const categoryRows = categories.map((c) => ({
      provider_id: provider.id,
      category_id: c,
    }));

    const { error: categoryError } = await supabase
      .from("provider_category_map")
      .insert(categoryRows);

    if (categoryError) {
      alert(categoryError.message);
      setLoading(false);
      return;
    }

    alert("Submitted! Your provider account is under review.");
    router.push("/");
  }

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">
        Service Provider Application
      </h1>

      <label className="block mb-2 font-medium">Business Name</label>
      <input
        className="w-full px-4 py-2 border rounded mb-6"
        onChange={(e) => setBusinessName(e.target.value)}
      />

      <label className="block mb-2 font-medium">Select Categories</label>

      <div className="space-y-2 mb-6">
        {categoryOptions.map((cat) => (
          <label key={cat} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={cat}
              onChange={(e) => {
                if (e.target.checked)
                  setCategories([...categories, cat]);
                else
                  setCategories(categories.filter((v) => v !== cat));
              }}
            />
            {cat}
          </label>
        ))}
      </div>

      <Button disabled={loading} onClick={handleSubmit}>
        {loading ? "Submitting..." : "Submit Application"}
      </Button>
    </div>
  );
}
