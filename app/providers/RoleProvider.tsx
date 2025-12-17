"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

interface RoleContextType {
  role: string | null;
  loading: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isOps: boolean;
  isMarketing: boolean;
}

const RoleContext = createContext<RoleContextType>({
  role: null,
  loading: true,
  isOwner: false,
  isAdmin: false,
  isOps: false,
  isMarketing: false,
});

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = supabaseBrowser();

  useEffect(() => {
    async function loadRole() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userRole = session?.user?.app_metadata?.role || "user";

      setRole(userRole);
      setLoading(false);
    }

    loadRole();

    // Live session updates
    const { data: listener } = supabase.auth.onAuthStateChange(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setRole(session?.user?.app_metadata?.role || "user");
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <RoleContext.Provider
      value={{
        role,
        loading,
        isOwner: role === "owner",
        isAdmin: role === "admin" || role === "owner",
        isOps: role === "ops" || role === "owner",
        isMarketing: role === "marketing" || role === "owner",
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
