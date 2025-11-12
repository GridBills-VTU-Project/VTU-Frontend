import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: process.env.DOTNET_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // set to true if you use cookies for auth
});
// 🧩 Request Interceptor
api.interceptors.request.use(
  async (config) => {
    if (config.url?.includes("Auth")) {
      return config; // Skip token logic
    }
    // Example: attach auth token from localStorage
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      return Promise.reject(new AxiosError("Unauthorized", undefined, undefined, undefined, {
        status: 401,
        statusText: "Unauthorized",
        headers: {},
        config,
        data: { ret_msg: "Unauthorized" }
      }));
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;