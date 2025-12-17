"use client";

import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function ProviderSettings() {

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Settings</h1>

      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
