"use client";
import UseAxios from "@/app/customHooks/UseAxios";
import { isValidPassword } from "@/app/util/functions";
import { isAxiosError } from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SignupForm = () => {
  const api = UseAxios();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    isChecked: false,
  });
useEffect(()=>{
  localStorage.removeItem("vtuotpExpiry")
},[]);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
setLoading(true)
    try {
      console.log(form);
      const res = await api.post("auth/register", JSON.stringify(form));
      toast.success(res.data.msg);
      localStorage.setItem("vtuPendingEmail", form.email);
      router.push("/otp");
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error("Something went wrong.");
    }finally{
      setLoading(false);
    }
  };
  const selectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;

    if (name === "isChecked") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    if (name === "password") {
      setForm((prev) => ({ ...prev, password: value }));

      if (!isValidPassword(value)) {
        setError(
          "password must be at least 6 characters long, containing at least 1 upper case character, 1 special character and 1 number"
        );
      } else {
        setError("");
      }
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form
      onSubmit={submit}
      className="flex flex-col px-15 rounded-lg w-full max-xl:mb-20"
    >
      <p className="mb-2">First Name</p>
      <input
        required={true}
        name="first_name"
        value={form.first_name}
        onChange={selectOption}
        type="text"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
        placeholder="Please enter your first name"
      />
      <p className="mt-10">Last Name</p>
      <input
        required={true}
        name="last_name"
        value={form.last_name}
        onChange={selectOption}
        type="text"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
        placeholder="Please enter your last name"
      />
      <p className="mt-10">Email Address</p>
      <input
        required={true}
        name="email"
        value={form.email}
        onChange={selectOption}
        type="email"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
        placeholder="Please enter your name"
      />
      <p className="mt-10">Phone Number</p>
      <input
        required={true}
        name="phone"
        value={form.phone}
        onChange={selectOption}
        type="tel"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
        placeholder="Please enter your number"
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
      <p className="font-light italic text-red-500 text-xs leading-[18px] tracking-[0.5px] mb-5">
        {error}
      </p>
      {/* <div className="mt-10 flex gap-3">
        <input
          type="checkbox"
          className="p-5 rounded-lg"
          name="isChecked"
          checked={form.isChecked}
          onChange={selectOption}
        />
        <p className="leading-6 text-sm text-[#727272] max-sm:text-xs">
          Remember Password
        </p>
      </div> */}

      <button disabled={loading} className="flex justify-center items-center gap-2 bg-[#646FC6] hover:bg-[#646FC6]/90 focus:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer ">
        <div className={"flex justify-center " + (!loading && " hidden")}>
          <div
            className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
        Register
      </button>
    </form>
  );
};

export default SignupForm;
