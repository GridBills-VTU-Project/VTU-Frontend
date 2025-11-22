'use client'
import UseAxios from "@/app/customHooks/UseAxios";
import { NormalLoadingScreen } from "@/app/loading";
import { isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const VerifyPayment = () => {
//   const fullUrl = window.location.href;
const router =  useRouter();
  const api = UseAxios();
  const { reference } = useParams();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await api.get(`/dashboard/${reference}`);
        toast.success("Funded successfully")
        router.push("/dashboard")
      } catch (error: any) {
        if (isAxiosError(error)) {
          console.log(error);
          return;
        }
        toast.error(error.message || "Failed");
      }
    };

    if (reference) {
      verifyPayment();
    }
  }, [reference]);

  return <NormalLoadingScreen />;
};

export default VerifyPayment;
