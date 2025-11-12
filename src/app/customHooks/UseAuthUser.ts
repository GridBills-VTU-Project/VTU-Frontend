"use client";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../lib/Api";
import UseAxios from "./UseAxios";

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
