"use client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UseAxios = () => {
  const router = useRouter();

  const api = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3000/api/",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // set to true if you use cookies for auth
  });

  // 🧩 Response Interceptor
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const { status, data } = error.response as AxiosResponse;

      const message =
        (error.response?.data as any)?.error ||
        "Something went wrong. Please try again.";

      // 🔥 Display toast depending on status code
      if (status === 401) {
        if (typeof window != "undefined") {
          const origin = window.location.origin;
          const fullUrl = window.location.href;
          const redirect = fullUrl.split(origin)[1];
          localStorage.setItem("vtuAuthenticated", "false");
          console.log(redirect);
          toast.error("Session expired. Please login again.");
          router.push("/login" + (redirect ? `?redirect=${redirect}` : ""));
        }
      }
      if (status === 400) {
        if (data.validationErrors) {
          const modelStateErrors: string[] = [];
          data.validationErrors.forEach((i: string) => {
            modelStateErrors.push(i);
            toast.error(i);
          });
          return;
        }

        toast.error(message);
      } else if (status === 403)
        toast.error("You are not authorized for this action.");
      else if (status === 404) toast.error("Not found.");
      else if (status === 500) toast.error("Server error. Try again later.");
      else toast.error(message);

      return Promise.reject(error);
    }
  );

  return api;
};

export default UseAxios;
