import supabase from "@/lib/supabase";

export async function logStatusUpdate(ride_id: string, status: string, meta = {}) {
  // insert a new status update using Supabase client
  const { data, error } = await supabase
    .from("status_updates")
    .insert([{ ride_id, status, meta }]);

  if (error) throw error;
  return data;
}
