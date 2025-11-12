"use client";
import React, { ReactNode } from "react";
import { useAuthUser } from "./UseAuthUser";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UseAuth({ children }: { children: ReactNode }) {
  const { data: user, isLoading, isError, error } = useAuthUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    if (isAxiosError(error)) {
      if (error.status === 401) {
        return;
      } else {
        router.back();
        return;
      }
    } else {
      toast.error(error?.message);
      router.back();
      return;
    }
  }
  return <>{children}</>;
}
