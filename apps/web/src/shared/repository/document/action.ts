"use server";

import { env } from "@/shared/lib/env";
import { getSession } from "../session-manager/action";

export type UploadDocumentResponse = {
  id: string;
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  url: string;
  uploadedAt: string;
};

export type DocumentActionResult = {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
};

export async function uploadDocumentAction(
  file: File
): Promise<DocumentActionResult> {
  const session = await getSession();
  try {
    if (!file) {
      return {
        success: false,
        error: "No document file provided",
      };
    }

    const formData = new FormData();
    formData.append("document", file);

    const response = await fetch(`${env.API_URL}/documents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: formData,
    });

    // Check if response is ok
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `Server error: ${response.status}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }

    // Parse successful response
    const res = await response.json();

    // Handle different response structures
    if (res && typeof res === "object") {
      // Check if response has error property
      if (res.error) {
        return {
          success: false,
          error: res.error,
          message: res.message || res.error,
        };
      }

      // Check if response indicates success
      if (res.success === false) {
        return {
          success: false,
          error: res.message || res.error || "Upload failed",
          message: res.message,
        };
      }

      console.log("====================================");
      console.log(res);
      console.log("====================================");
      // If response looks successful
      return {
        success: true,
        data: res,
        message: res.message,
      };
    }

    // If response is not an object or is null/undefined
    return {
      success: false,
      error: "Invalid response from server",
    };
  } catch (error: any) {
    console.error("Document upload error:", error);

    // Handle different error types
    let errorMessage = "Failed to upload document";

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      errorMessage = "Network error: Unable to connect to server";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Alternative function name to match your existing pattern
export async function extractDocuments(file: File) {
  try {
    const formData = new FormData();
    formData.append("document", file);

    const response = await fetch(`${env.API_URL}/documents`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res = await response.json();
    return res;
  } catch (error: any) {
    console.error("Extract documents error:", error);
    throw error;
  }
}
