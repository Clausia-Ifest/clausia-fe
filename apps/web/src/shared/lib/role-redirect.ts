import { notFound } from "next/navigation";
import { RoleMap } from "@/shared/lib/role-map";

export function getRoleRedirectPath(role: string): string {
  if (role === RoleMap.Admin) {
    return "/dashboard/home";
  }
  if (role === RoleMap.Legal) {
    return "/dashboard/home";
  }
  if (role === RoleMap.Manager) {
    return "/manager";
  }
  return notFound();
}
