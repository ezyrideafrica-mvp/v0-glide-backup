"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "./useSupabase";

export default function useUser() {
  const supabase = useSupabase();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
      setLoading(false);
    }

    load();
  }, []);

  return { user, loading };
}
