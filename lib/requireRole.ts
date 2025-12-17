export function requireRole(role: string, userRole: string | null) {
  if (!userRole) return false;
  return userRole === role || userRole === "dev_admin"; 
}
