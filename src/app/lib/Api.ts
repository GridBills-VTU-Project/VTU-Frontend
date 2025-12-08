// import { cookies } from "next/headers";
import { AxiosInstance } from "axios";
import { DataArray, examPackage, TvPackage, User } from "../util/types";

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

export async function getDashboard(api: AxiosInstance) {
  const res = await api.get("dashboard");
  return res.data; // Axios auto-parses JSON
}
export async function getWallet(api: AxiosInstance) {
  const res = await api.get("dashboard/wallet");
  return res.data; // Axios auto-parses JSON
}
export async function getReward(api: AxiosInstance) {
  const res = await api.get("dashboard/reward");
  return res.data; // Axios auto-parses JSON
}
export const getCurrentUser = async (api: AxiosInstance): Promise<User> => {
  const res = await api.get("auth/user");
  return res.data; // { id, name, email, role, ... }
};
export const getDataPlans = async (api: AxiosInstance,network:string): Promise<DataArray[]> => {
  const res = await api.get("services/"+network);
  return res.data;
};
export const getExamPurchase = async (api: AxiosInstance): Promise<examPackage[]> => {
  const res = await api.get("services");
  return res.data;
};
export const getTvPurchase = async (api: AxiosInstance,tv:string): Promise<TvPackage[]> => {
  const res = await api.get("services/tv/"+tv.toLocaleLowerCase());
  return res.data;
};