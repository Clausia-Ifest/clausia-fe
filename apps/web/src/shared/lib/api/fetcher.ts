/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
import { processResponse } from "@/shared/lib/api/response";
import { getSession } from "@/shared/repository/session-manager/action";
import type { ApiResponse } from "@/shared/types/api/api-response";
import type { TAPIQuery } from "@/shared/types/api/TAPI-query";
import { appendQueryParams } from "../query-params";

export async function apiFetch<T>({
  url,
  options = {},
  query,
  isFormData = false,
  errorMessage = "Error fetching data",
  successMessage = "Success",
}: {
  url: string;
  options?: RequestInit;
  query?: TAPIQuery;
  isFormData?: boolean;
  errorMessage?: string;
  successMessage?: string;
}): Promise<ApiResponse<T>> {
  const session = await getSession();
  const defaultHeaders: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "skipasdas",
  };

  if (session) {
    defaultHeaders.Authorization = `Bearer ${session.access_token}`;
  }

  if (isFormData) {
    defaultHeaders["Content-Type"] = "multipart/form-data";
  }

  const _url = new URL(url);

  if (query) {
    appendQueryParams(_url, query);
  }

  try {
    const response = await fetch(_url.toString(), {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    return processResponse<T>(response, errorMessage, successMessage);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      message: errorMessage,
    };
  }
}
