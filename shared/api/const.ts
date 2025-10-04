const API_URL = Bun.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL is not set");
}

export const url = API_URL;
