import { supabase } from "@/lib/supabaseClient";

export default async function ProviderJobs() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: provider } = await supabase
    .from("service_providers")
    .select("id")
    .eq("user_id", user?.id)
    .single();

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("provider_id", provider?.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Assigned Jobs</h1>

      <div className="space-y-4">
        {jobs?.map((job) => (
          <div key={job.id} className="p-4 border rounded bg-white">
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm mt-1">{job.description}</p>
            <p className="mt-2 text-sm text-gray-600">
              Status: <span className="capitalize">{job.status}</span>
            </p>
          </div>
        ))}

        {(!jobs || jobs.length === 0) && (
          <p className="text-gray-600">No jobs assigned yet.</p>
        )}
      </div>
    </div>
  );
}
