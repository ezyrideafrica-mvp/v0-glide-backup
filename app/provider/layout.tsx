import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 space-y-6">
        <h2 className="text-xl font-bold">Provider Panel</h2>

        <nav className="space-y-3">
          <Link href="/provider/dashboard" className="block text-gray-700 hover:text-primary">
            Dashboard
          </Link>

          <Link href="/provider/jobs" className="block text-gray-700 hover:text-primary">
            Jobs
          </Link>

          <Link href="/provider/settings" className="block text-gray-700 hover:text-primary">
            Settings
          </Link>

          <Link href="/provider/documents" className="block text-gray-700 hover:text-primary">
            Documents
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
