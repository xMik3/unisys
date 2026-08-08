import type {ApiRequest} from "../types/models";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export class ApiError extends Error{
  status: number;

  constructor(message: string, status: number,){
    super(message);
    this.status = status;
  }
}

export async function apiRequest<T>(path: string, options: ApiRequest): Promise<T> {
  const {method, token, body} = options;

  let requestBody: string | undefined;
  if (body !== undefined) {
    requestBody = JSON.stringify(body);
  }

  const headers: Record<string, string> = {};
  if (requestBody !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = token;
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {method, headers, body: requestBody});
  } catch {
    throw new ApiError("Network error. Please try again.", 0);
  }

  let data: {message?: string} | null = null;
  try {
    data = await res.json();
  } catch {

  }

  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    if (data?.message) {
      message = data.message;
    }
    throw new ApiError(message, res.status);
  }

  return data as T;
}
