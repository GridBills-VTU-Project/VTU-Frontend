'use client';
import { isAxiosError } from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLoginMutation } from "../customHooks/useMutation";
import { selectOption } from "../util/functions";

const SigninForm = () => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const redirect = searchParams.get("redirect");
  const safeRedirect = redirect?.startsWith("/")
    ? redirect
    : "/dashboard?tab=dashboard";
  const [form, setForm] = useState({
    phone: "",
    password: "",
    isChecked: false,
  });

  const { mutate, isPending } = useLoginMutation({redirect:safeRedirect});

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(form);
      mutate(form)

    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        return;
      }
      toast.error("something went wrong.");
    }
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
        onChange={(e)=> selectOption(e,setForm)}
        type="text"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg truncate"
        placeholder="Enter email or phone number"
      />
      <p className="mt-10">Password</p>
      <div className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] rounded-lg flex justify-between gap-5">
        <input
          required={true}
          name="password"
          value={form.password}
          onChange={(e)=> selectOption(e,setForm)}
          type={open ? "text" : "password"}
          className="outline-0 w-full p-5 truncate"
          placeholder="Enter your password"
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
      <p className="text-center mt-5">
        Forgot password?
        <button
          className="underline text-blue-600 hover:cursor-pointer hover:text-blue-600/80"
        >
          Reset
        </button>{" "}
      </p>
      <button
        disabled={isPending}
        className="flex justify-center items-center gap-2 bg-[#646FC6] hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
      >
        <div className={"flex justify-center " + (!isPending && " hidden")}>
          <div
            className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
        Login
      </button>
    </form>
  );
};

export default SigninForm;
