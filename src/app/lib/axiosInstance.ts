// lib/axiosInstance.ts

import axios from "axios";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.DOTNET_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // set to true if you use cookies for auth
});

export default api;