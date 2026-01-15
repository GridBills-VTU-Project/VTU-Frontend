import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[.!@#$%^&*])(?=.*[A-Z]).{7,}$/;
  return passwordRegex.test(password);
};

export function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  export const selectOption = (e: React.ChangeEvent<HTMLInputElement>,setForm: Dispatch<SetStateAction<any>>) => {
    const { name, value } = e.target;
    setForm((prev:any) => ({ ...prev, [name]: value }));
  };
  export const handleCopy = async (text:string)=>{
    await navigator.clipboard.writeText(text)
    toast.info("copied");
  }

  export const formatAmount = (amount:string|number)=>{
    return Number(amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }