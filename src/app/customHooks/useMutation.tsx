// src/hooks/useLoginMutation.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./UseAxios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AxiosResponse, isAxiosError } from "axios";
import { registerForm } from "../util/types";
export const useLoginMutation = ({ redirect }: { redirect: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const api = useAxios();

  return useMutation({
    mutationFn: async (form: { phone: string; password: string }) => {
      const res = await api.post("/auth/login", form);
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.msg);
      // await queryClient.invalidateQueries({ queryKey: ["authUser"] });//was to invalidate the user
      // Seed the authUser query with the returned user details
      queryClient.setQueryData(["authUser"], data.user);
      const session = parseInt(
        process.env.NEXT_PUBLIC_SESSION_EXPIRY_SECONDS || "7200"
      );
      const sessionExpiry = Date.now() + session * 1000;
      localStorage.setItem("vtuAuthenticated", sessionExpiry.toString());
      router.push(redirect);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error("Login failed. Please check your credentials.");
    },
  });
};

export const useRegisterMutation = () => {
  const router = useRouter();
  const api = useAxios();

  return useMutation({
    mutationFn: async (form: registerForm) => {
      const res = await api.post("auth/register", JSON.stringify(form));
      return res.data;
    },
    onSuccess: async (data, variables) => {
      toast.success(data.msg);
      localStorage.setItem("vtuPendingEmail", variables.email);
      router.push("/otp");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error("Registration failed. Please try again.");
    },
  });
};

export const useOtpMutation = () => {
  const router = useRouter();
  const api = useAxios();

  return useMutation({
    mutationFn: async (form: { email: string; otp: string }) => {
      const res = await api.post("auth/otp", JSON.stringify(form));
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.msg);
      localStorage.clear();
      router.push("/signin");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "Otp verification failed");
    },
  });
};

export const useLogOutMutation = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const api = useAxios();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post("auth/logout");
      return res.data;
    },
    onSuccess: async (data) => {
      // router.push("/signin");
      toast.success(data.msg);
      localStorage.clear();
      queryClient.clear(); // Optional: clears *all* queries
      return;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "log out failed");
    },
  });
};

export const useWalletMutation = () => {
  const api = useAxios();

  return useMutation({
    mutationFn: async (form: { amount: string; type: "fund" | "borrow" }) => {
      let res: AxiosResponse<any, any>;
      res = form.type === "fund"? await api.post("dashboard/wallet", JSON.stringify(form)) : await api.patch("dashboard/wallet", JSON.stringify(form)) ;
      return res.data;
    },
    onSuccess: async (data) => {
      if (data.authorization_url) {
        toast.success("You're getting redirected");
        window.location.href = data.authorization_url;
      } else {
        toast.error(data.msg || "Borrow successful");
      }
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "funding wallet failed");
    },
  });
};

export const useForgotPasswordMutation = () => {
  const api = useAxios();
  const router = useRouter();
  return useMutation({
    mutationFn: async (form: { email: string }) => {
      const res = await api.post("auth/forgotpassword", JSON.stringify(form));
      return res.data;
    },
    onSuccess: async (data, variables) => {
      toast.success(data.msg || "Success");
      localStorage.setItem("vtuResetEmail", variables.email);
      router.push("/verify-otp");
    },
    onError: (error) => {
      router.push("/forgotpassword");
      localStorage.removeItem("vtuResetEmail");
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "Failed to send otp");
    },
  });
};

export const useForgotpasswordOtpMutation = () => {
  const router = useRouter();
  const api = useAxios();

  return useMutation({
    mutationFn: async (form: { email: string; otp: string; password:string }) => {
      const res = await api.put("auth/forgotpassword", JSON.stringify(form));
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.msg);
      localStorage.clear();
      router.push("/signin");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "Otp verification failed");
    },
  });
};

export const useApproveAgentMutation = () => {
  const router = useRouter();
  const api = useAxios();
const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: { agentId: string }) => {
      const res = await api.post("admin/agents",JSON.stringify(form));
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.msg);
      queryClient.invalidateQueries({queryKey:["allAgents"]})
      // router.refresh();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "Agent approval failed");
    },
  });
};

export const useUpdateCommissionMutation = () => {
  const api = useAxios();
const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commissionRate: string) => {
      const res = await api.post("admin/commission",JSON.stringify({commissionRate}));
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.msg || "Commission updated successfully");
      queryClient.refetchQueries({queryKey:["AdminCommission"]},{cancelRefetch:true});
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "Commission update failed");
    },
  });
};

export const useActivateOrSuspendUserMutation = () => {
  const api = useAxios();
const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({isApproving,userId}:{isApproving: "true"|"false",userId:string}) => {
      const res = await api.post("admin/users",JSON.stringify({isApproving,userId}));
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.msg || "successful");
      queryClient.refetchQueries({queryKey:["allUsers"]},{cancelRefetch:true});
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "Action failed");
    },
  });
};

export const useUpdateExamPackagePric = () => {
  const api = useAxios();
const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({examPackage,newPrice}:{examPackage: any,newPrice:string}) => {
      const res = await api.post("admin/settings/exam",JSON.stringify({examPackage,newPrice}));
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.msg || "successful");
      queryClient.refetchQueries({queryKey:["exam_settings"]},{cancelRefetch:true});
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "Action failed");
    },
  });
};

export const useUpdateTvPackagePrice = () => {
  const api = useAxios();
const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({tvPackage,newPrice}:{tvPackage: any,newPrice:string}) => {
      const res = await api.post("admin/settings/tv",JSON.stringify({tvPackage,newPrice}));
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.msg || "successful");
      queryClient.refetchQueries({queryKey:["tv_settings"]},{cancelRefetch:true});
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "Action failed");
    },
  });
};

export const useSyncDataPlans = () => {
  const api = useAxios();
// const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("admin/settings/data");
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "successful");
      // queryClient.refetchQueries({queryKey:["tv_settings"]},{cancelRefetch:true});
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "Action failed");
    },
  });
};