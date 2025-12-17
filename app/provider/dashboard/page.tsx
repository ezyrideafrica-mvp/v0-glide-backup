import { supabase } from "@/lib/supabaseClient";

export default async function ProviderDashboard() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div>Please log in</div>;

  const { data: provider } = await supabase
    .from("service_providers")
    .select("id, business_name, status")
    .eq("user_id", user.id)
    .single();

  const { data: categories } = await supabase
    .from("provider_category_map")
    .select("category_id")
    .eq("provider_id", provider?.id);

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("provider_id", provider?.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome, {provider?.business_name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        {/* Status */}
        <div className="p-6 bg-white shadow rounded">
          <h3 className="font-semibold text-gray-600">Account Status</h3>
          <p
            className={`mt-2 font-bold ${
              provider?.status === "approved"
                ? "text-green-600"
                : provider?.status === "pending"
                ? "text-orange-500"
                : "text-red-600"
            }`}
          >
            {provider?.status.toUpperCase()}
          </p>
        </div>

        {/* Categories */}
        <div className="p-6 bg-white shadow rounded">
          <h3 className="font-semibold text-gray-600">Categories</h3>
          <ul className="mt-2 space-y-1">
            {categories?.map((c) => (
              <li key={c.category_id} className="text-gray-800">
                • {c.category_id}
              </li>
            ))}
          </ul>
        </div>

        {/* Jobs Count */}
        <div className="p-6 bg-white shadow rounded">
          <h3 className="font-semibold text-gray-600">Completed Jobs</h3>
          <p className="mt-2 text-3xl font-bold">{jobs?.length || 0}</p>
        </div>
      </div>

      {/* Job Table */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>

        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left">Job</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {(jobs || []).slice(0, 5).map((job) => (
                <tr key={job.id} className="border-t">
                  <td className="p-3">{job.title}</td>
                  <td className="p-3 capitalize">{job.status}</td>
                  <td className="p-3">{new Date(job.created_at).toLocaleDateString()}</td>
                </tr>
              ))}

              {(!jobs || jobs.length === 0) && (
                <tr>
                  <td className="p-4 text-gray-500 text-center" colSpan={3}>
                    No jobs assigned yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
