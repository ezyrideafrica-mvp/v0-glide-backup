"use client";

import useUser from "./useUser";

export default function useUserRole() {
  const { user, loading } = useUser();

  const role =
    user?.app_metadata?.role ||
    user?.user_metadata?.role ||
    null;

  return { role, loading, user };
}
