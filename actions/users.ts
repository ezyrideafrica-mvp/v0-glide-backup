"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

// Create user
export async function createUserAction(data: {
  email: string;
  password: string;
  full_name: string;
  role: string;
}) {
  const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      full_name: data.full_name
    },
    app_metadata: {
      role: data.role
    }
  });

  if (error) throw error;
  revalidatePath("/admin/users");
  return user;
}

// Update user role
export async function updateUserRoleAction(userId: string, role: string) {
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    app_metadata: { role }
  });

  if (error) throw error;
  revalidatePath("/admin/users");
}

// Delete user
export async function deleteUserAction(userId: string) {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) throw error;

  revalidatePath("/admin/users");
}
