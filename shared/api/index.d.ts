import type { HealthCheckResponse } from "@/types";
import "../types";
/**
 * Validates the response from the server
 * @param response  The response from the server
 * @returns       The response body
 */
export declare function validateResponse<Type>(response: Response): Promise<Type>;
export declare function healthCheck(): Promise<HealthCheckResponse>;
