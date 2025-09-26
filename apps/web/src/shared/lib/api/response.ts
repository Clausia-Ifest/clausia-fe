/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */
/** biome-ignore-all lint/correctness/noUndeclaredVariables: <explanation> */
import { notFound } from "next/navigation";
import { logout } from "@/shared/repository/auth/action";
import type { ApiResponse } from "../../types/api/api-response";

export async function processResponse<T>(
  response: Response,
  errorMessage: string,
  successMessage: string
): Promise<ApiResponse<T>> {
  if (!response.ok) {
    if ([401, 403, 307].includes(response.status)) {
      logout();
    }
    if (response.status === 404) {
      notFound();
    }

    const message = await handleErrorResponse(response, errorMessage);
    return {
      success: false,
      error: message,
      message,
    };
  }

  if (response.status === 204) {
    return {
      success: true,
      data: undefined as T,
      message: successMessage,
    };
  }

  try {
    const data = await parseJson<T>(response);
    console.log("[SUCCESS] url ", response.url, " - data: ", data);
    return {
      success: true,
      data,
      message: successMessage,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: `${errorMessage}: Failed to parse response`,
    };
  }
}

async function handleErrorResponse(
  response: Response,
  defaultError: string
): Promise<string> {
  try {
    const errorData = await response.json();
    console.log(
      "[ERROR] url ",
      response.url,
      " - errorData: ",
      JSON.stringify(errorData)
    );
    return errorData?.payload?.error;
  } catch {
    return response.statusText || defaultError;
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Invalid JSON response: ${error instanceof Error ? error.message : "Unknown parsing error"}`
    );
  }
}
