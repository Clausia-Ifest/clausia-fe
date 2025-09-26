/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
"use server";

import { apiFetch } from "@/shared/lib/api/fetcher";
import { env } from "@/shared/lib/env";
import { getSession } from "../session-manager/action";
import type { ContractsResponse } from "./dto";

export async function getContracts() {
  const res = await apiFetch<ContractsResponse>({
    url: `${env.API_URL}/contracts`,
    options: {
      method: "GET",
    },
  });

  return res;
}

export async function submitContracts(data: FormData) {
  const session = await getSession();
  const res = await fetch(`${env.API_URL}/contracts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to submit contracts: ${res.statusText}`);
  }

  const result = await res.json();
  return result;
}

export async function sendContract(contractId: string) {
  const res = await apiFetch<{ message: string }>({
    url: `${env.API_URL}/contracts/${contractId}`,
    options: {
      method: "PATCH",
      body: JSON.stringify({
        application_status: "Manager",
      }),
    },
  });

  return res;
}
