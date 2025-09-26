"use server";

import { env } from "@/shared/lib/env";

export async function getHealth() {
  try {
    const response = await fetch(`${env.API_URL}/health`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "skipasdas",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    }

    return { success: false, error: data?.message ?? "Unknown error" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
