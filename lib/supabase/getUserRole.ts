import { createClient } from "@/lib/supabase/server";

export async function getUserRole() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase.rpc("get_user_role", {
    uid: user.id,
  });

  if (error) return null;

  return data;
}
