// import { cookies } from "next/headers";

import { AxiosInstance } from "axios";

// export async function getUserFromCookie() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) return null;

//   // Optionally call your .NET backend to verify the token:
//   const res = await fetch(`${process.env.BACKEND_URL}/api/auth/validate`, {
//     headers: { Authorization: `Bearer ${token}` },
//     cache: "no-store",
//   });

//   if (!res.ok) return null;
//   const user = await res.json();
//   return user;
// }
// export async function getDashboard() {

//   // Optionally call your .NET backend to verify the token:
//   const res = await fetch(`${process.env.BACKEND_URL}/api/auth/validate`, {
//     cache: "no-store",
//   });

//   if (!res.ok) return null;
//   const user = await res.json();
//   return user;
// }

// 'use client'

// import UseAxios from "../customHooks/UseAxios";

// export async function getDashboard() {
//   const api = UseAxios();
//   console.log("clicked")
//   try {
//     const res = await api.get("dashboard");
//     console.log("dd",res);
    
//     return res.data; // Axios auto-parses JSON
    
//   } catch (error) {
//     console.log(error);
    
//   }
// }


export async function getDashboard(api:AxiosInstance) {
    const res = await api.get("dashboard");
    return res.data; // Axios auto-parses JSON
};