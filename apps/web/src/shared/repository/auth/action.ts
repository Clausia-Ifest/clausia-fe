"use server";

import type { LoginResponse } from "@/features/auth/types/response";
import type { TLoginRequest } from "@/features/auth/types/schema";
import { apiFetch } from "@/shared/lib/api/fetcher";
import { env } from "@/shared/lib/env";
import { destroySession } from "../session-manager/action";

export async function login(payload: TLoginRequest) {
  const res = await apiFetch<LoginResponse>({
    url: `${env.API_URL}/auth`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });

  return res;
}

export async function logout() {
  await destroySession();
}
