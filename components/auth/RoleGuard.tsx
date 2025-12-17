"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useUserRole from "@/hooks/useUserRole";

export default function RoleGuard({ children, allow }: {
  allow: string[]; // ["owner", "admin"]
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { role, loading } = useUserRole();

  useEffect(() => {
    if (!loading) {
      if (!role) {
        router.replace("/login");
      } else if (!allow.includes(role)) {
        router.replace("/unauthorized");
      }
    }
  }, [role, loading]);

  if (loading) return null;

  return <>{children}</>;
}
