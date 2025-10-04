const API_URL = import.meta.env.API_URL ?? import.meta.env.VITE_API_URL;
console.log(import.meta.env);
if (!API_URL) {
  throw new Error("API_URL is not set");
}

export const url = API_URL;
