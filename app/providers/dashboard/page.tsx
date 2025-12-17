import supabase from "@/lib/supabase";

export default async function Dashboard() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div>Please log in</div>;

  const { data: provider } = await supabase
    .from("service_providers")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Service Provider Dashboard</h1>

      <p className="text-lg">
        Welcome, <b>{provider?.business_name}</b>
      </p>

      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold">Your Status</h2>
        <p>Approved: {provider?.approved ? "Yes" : "Pending"}</p>
      </div>
    </div>
  );
}
