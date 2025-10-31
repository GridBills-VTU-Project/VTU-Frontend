"use client";
import UseAxios from "@/app/customHooks/UseAxios";
import { isAxiosError } from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SigninForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
  const redirect = searchParams.get("redirect");
  const safeRedirect = redirect?.startsWith("/")
    ? redirect
    : "/pages/dashboard?tab=dashboard";
  const api = UseAxios();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    password: "",
    isChecked: false,
  });
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(form);
      const res = await api.post("auth/login", JSON.stringify(form));
      localStorage.setItem("vtuAuthenticated", "true");
      toast.success(res.data.msg || "Success.");
      router.push(safeRedirect);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        return;
      }
      toast.error("something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const selectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form
      onSubmit={submit}
      className="flex flex-col px-15 rounded-lg w-full max-xl:mb-20"
    >
      <p className="mt-10">Email Address/Phone No.</p>
      <input
        value={form.phone}
        name="phone"
        required={true}
        onChange={selectOption}
        type="text"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
        placeholder="Please enter email or phone number"
      />
      <p className="mt-10">Password</p>
           <div className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040]  rounded-lg flex justify-between gap-5">
        <input
          required={true}
          name="password"
          value={form.password}
          onChange={selectOption}
          type={open ? "text" : "password"}
          className="outline-0 w-full p-5"
          placeholder="Please enter your password"
        />
        {open ? (
          <button className="mr-5" type="button" onClick={() => setOpen(false)}>
            <Eye />
          </button>
        ) : (
          <button className="mr-5" type="button" onClick={() => setOpen(true)}>
            <EyeClosed />
          </button>
        )}
      </div>
      {/* <div className="mt-10 flex gap-3">
        <input
          name="isChecked"
          required={true}
          checked={form.isChecked}
          onChange={selectOption}
          type="checkbox"
          className="p-5 rounded-lg"
        />
        <p className="leading-6 text-sm text-[#727272] max-sm:text-xs">
          Remember Password
        </p>
      </div> */}

      <button
        disabled={loading}
        className="bg-[#646FC6] hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
      >
        Login
      </button>
    </form>
  );
};

export default SigninForm;
