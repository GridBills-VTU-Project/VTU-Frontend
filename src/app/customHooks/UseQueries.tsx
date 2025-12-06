"use client";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";
import { getCurrentUser, getDashboard, getDataPlans, getExamPurchase, getTvPurchase } from "../lib/Api";
import { DataArray, examPackage, TvPackage } from "../util/types";

export const useDashboard = () => {
  const api = UseAxios();
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(api),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes: consider data fresh
    // refetchInterval: 10000, // optional: auto-refetch every 10s
  });
};
export const usewallet = () => {
  const api = UseAxios();
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(api),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes: consider data fresh
    // refetchInterval: 10000, // optional: auto-refetch every 10s
  });
};
export const useAuthUser = () => {
  const api = UseAxios();
  return useQuery({
    queryKey: ["authUser"],
    queryFn: () => getCurrentUser(api),
    staleTime: 1000 * 60 * 60, // 60 mins
    retry: false, // don't retry if 401
    refetchOnWindowFocus:false,
  });
};

export function useGetDataPlans(network:string ) {
  const api = UseAxios();
  return useQuery<DataArray[], Error>({
    queryKey: ["data", network],
    queryFn: async () => getDataPlans(api, network),
    placeholderData: (prev) => prev, // avoids UI flicker
    retry:1,
    staleTime: 1000 * 60 * 60, // 1hr
  });
}
export function useGetExamPackages() {
  const api = UseAxios();
  return useQuery<examPackage[], Error>({
    queryKey: ["exam"],
    queryFn: async () => getExamPurchase(api),
    placeholderData: (prev) => prev, // avoids UI flicker
    retry:1,
    staleTime: 1000 * 24 * 60 * 60, // 1hr
  });
}
export function useGetTvPackages(tv:string) {
  const api = UseAxios();
  return useQuery<TvPackage[], Error>({
    queryKey: ["cable",tv],
    queryFn: async () => getTvPurchase(api,tv),
    placeholderData: (prev) => prev, // avoids UI flicker
    retry:1,
    staleTime: 1000 * 24 * 60 * 60, // 1hr
  });
}