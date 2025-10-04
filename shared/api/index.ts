import { url } from "./const";
import "../types";
import type { HealthCheckResponse } from "@/types";

/**
 * Validates the response from the server
 * @param response  The response from the server
 * @returns       The response body
 */
export async function validateResponse<Type>(
  response: Response
): Promise<Type> {
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  if (
    !response.headers.has("content-type") ||
    !response.headers.get("content-type")?.includes("application/json")
  ) {
    throw new Error("Invalid content type");
  }

  const body = await response.json();

  if (!body || typeof body !== "object") {
    throw new Error("Invalid response body");
  }

  // Check if the body has the correct type
  const data = body as Type;

  for (const key in data) {
    if (data[key] === undefined) {
      throw new Error("Invalid response body");
    }
  }

  return data;
}

export async function healthCheck(): Promise<HealthCheckResponse> {
  const start = performance.now();
  const response = await fetch(`${url}/health`);

  const end = performance.now();
  const latency = end - start;

  try {
    const body = await validateResponse<HealthCheckResponse>(response);
    return { ...body, latency };
  } catch (error) {
    throw new Error("Invalid health check response");
  }
}
