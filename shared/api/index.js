import "../types";
import { url } from "./const";
/**
 * Validates the response from the server
 * @param response  The response from the server
 * @returns       The response body
 */
export async function validateResponse(response) {
    if (!response.ok) {
        if (response.headers.has("content-type") &&
            response.headers.get("content-type")?.includes("application/json")) {
            const errorBody = (await response.json());
            const errorMessage = errorBody.message || "Unknown error";
            throw new Error(errorMessage);
        }
        else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    }
    if (!response.headers.has("content-type") ||
        !response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Invalid content type");
    }
    const body = await response.json();
    if (!body || typeof body !== "object") {
        throw new Error("Invalid response body");
    }
    // Check if the body has the correct type
    const data = body;
    for (const key in data) {
        if (data[key] === undefined || data[key] === null) {
            throw new Error("Invalid response body");
        }
    }
    return data;
}
export async function healthCheck() {
    const start = performance.now();
    const response = await fetch(`${url}/health`);
    const end = performance.now();
    const latency = end - start;
    try {
        const body = await validateResponse(response);
        return { ...body, latency };
    }
    catch (error) {
        throw new Error("Invalid health check response");
    }
}
