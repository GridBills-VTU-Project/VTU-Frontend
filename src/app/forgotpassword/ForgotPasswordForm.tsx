"use client";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../customHooks/useMutation";
import { selectOption } from "../util/functions";

const ForgotPasswordForm = () => {

  const [form, setForm] = useState({
    email: "",
  });

  const { mutateAsync, isPending } = useForgotPasswordMutation();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(form);
      await mutateAsync(form);
      
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
      <p className="mt-10">Email Address</p>
      <input
        value={form.email}
        name="email"
        required={true}
        onChange={(e) => selectOption(e, setForm)}
        type="email"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg truncate"
        placeholder="Enter email"
      />
      <button
        disabled={isPending}
        className="flex justify-center items-center gap-2 bg-[#646FC6] hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
      >
        <div className={"flex justify-center " + (!isPending && " hidden")}>
          <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        Submit
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
