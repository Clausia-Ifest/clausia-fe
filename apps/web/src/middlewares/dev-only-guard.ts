/** biome-ignore-all lint/suspicious/useAwait: <explanation> */
import { NextResponse } from "next/server";
import { DEV_ONLY_ROUTES } from "@/middleware";
import type { MiddlewareFunction } from "@/shared/types/middleware";

export const devOnlyGuard: MiddlewareFunction = async ({ req }) => {
  const pathname = req.nextUrl.pathname;
  const isDevRoute = DEV_ONLY_ROUTES.some((r: string) =>
    pathname.startsWith(r)
  );

  if (isDevRoute && process.env.NODE_ENV !== "development") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
};
