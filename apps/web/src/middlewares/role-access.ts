/** biome-ignore-all lint/suspicious/useAwait: <explanation> */
/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */
import { NextResponse } from "next/server";
import { RoleMap } from "@/shared/lib/role-map";
import type { MiddlewareFunction } from "@/shared/types/middleware";

// Route patterns with exact/prefix matching
const ROUTE_ACCESS = {
  [RoleMap.Admin]: ["/dashboard/**"],
  [RoleMap.Legal]: ["/dashboard/**"],
  [RoleMap.Manager]: ["/manager/**"],
} as const;

function matchesPattern(pathname: string, pattern: string): boolean {
  if (pattern.endsWith("/**")) {
    const base = pattern.slice(0, -3);
    return pathname === base || pathname.startsWith(`${base}/`);
  }
  return pathname === pattern;
}

export const roleBasedAccess: MiddlewareFunction = async ({ req, session }) => {
  const { pathname } = req.nextUrl;
  const role = session?.role as keyof typeof ROUTE_ACCESS;

  if (
    !(
      role &&
      ROUTE_ACCESS[role]?.some((pattern) => matchesPattern(pathname, pattern))
    )
  ) {
    return NextResponse.redirect(new URL("/notFound", req.url));
  }

  return NextResponse.next();
};
