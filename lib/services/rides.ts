import supabase from "@/lib/supabase";

export async function createRide(data: {
  passenger_name: string;
  pickup_airport: string;
  pickup_time: string;
  flight_number: string;
  destination: string;
}) {
  const { data: ride, error } = await supabase
    .from("rides")
    .insert([
      {
        passenger_name: data.passenger_name,
        pickup_airport: data.pickup_airport,
        pickup_time: data.pickup_time,
        flight_number: data.flight_number,
        destination: data.destination,
      },
    ])
    .select("*")
    .single();

  if (error) throw error;
  return ride;
}

export async function getRideById(id: string) {
  const { data: ride, error } = await supabase
    .from("rides")
    .select("*, status_history(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return ride;
}

export async function updateRideStatus(id: string, status: string) {
  const { data: ride, error } = await supabase
    .from("rides")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return ride;
}
