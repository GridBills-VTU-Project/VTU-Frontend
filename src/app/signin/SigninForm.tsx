"use client";
import { isAxiosError } from "axios";
import { Eye, EyeClosed, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLoginMutation } from "../customHooks/useMutation";
import { selectOption } from "../util/functions";
import Link from "next/link";

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
  const { mutate, isPending } = useLoginMutation({ redirect: safeRedirect });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(form);
      mutate(form);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        return;
      }
      toast.error("something went wrong.");
    }
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="flex flex-col px-15 rounded-lg w-full max-xl:mb-20"
      >
        <p className="mt-10">Email Address/Phone No.</p>
        <input
          value={form.phone}
          name="phone"
          required={true}
          onChange={(e) => selectOption(e, setForm)}
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
            onChange={(e) => selectOption(e, setForm)}
            type={open ? "text" : "password"}
            className="outline-0 w-full p-5 truncate"
            placeholder="Enter your password"
          />
          {open ? (
            <button
              className="mr-5"
              type="button"
              onClick={() => setOpen(false)}
            >
              <Eye />
            </button>
          ) : (
            <button
              className="mr-5"
              type="button"
              onClick={() => setOpen(true)}
            >
              <EyeClosed />
            </button>
          )}
        </div>
        <p className="text-center mt-5">
          Forgot password?
          <Link
          href={"/forgotpassword"}
          // type="button"
          //   onClick={() => setshowForgotPasswordModal(true)}
            className="underline text-blue-600 hover:cursor-pointer hover:text-blue-600/80"
          >
            Reset
          </Link>{" "}
        </p>
        <button
          disabled={isPending}
          className="flex justify-center items-center gap-2 bg-[#646FC6] hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
        >
          <div className={"flex justify-center " + (!isPending && " hidden")}>
            <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          Login
        </button>
      </form>
      {
      //  showForgotPasswordModal &&
      //   <div className="fixed inset-0 bg-black/30 backdrop-blur-sm  bg-opacity-60 flex items-center justify-center z-[60]">
      //     <div className="bg-white rounded-2xl w-[700px] shadow-2xl h-fit">
      //       {/* Reject Modal Header */}
      //       <div className="flex items-center justify-between p-6 border-b border-gray-200">
      //         <h3 className="text-xl font-semibold text-gray-900">
      //           Reset Password
      //         </h3>
      //         <button
      //           onClick={() => {
      //             setshowForgotPasswordModal(false);
      //           }}
      //           className="text-gray-400 hover:text-gray-600 transition-colors"
      //         >
      //           <X size={20} />
      //         </button>
      //       </div>

      //       {/* Reject Modal Content */}
      //       <div className="p-6">
      //         <p className="text-gray-600 mb-4">
      //           Please Enter Your Registered Email Address.
      //         </p>
      //         <div className="w-full flex flex-wrap justify-between gap-y-10 mt-5 ">
      //           <input
      //             value={forgotPasswordForm.email}
      //             name="email"
      //             required={true}
      //             onChange={(e) => selectOption(e, setforgotPasswordForm)}
      //             type="email"
      //             className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg truncate"
      //             placeholder="Enter email"
      //           />
      //         </div>

      //         {/* Reject Modal Buttons */}
      //         <div className="flex items-center justify-end gap-3 mt-6">
      //           <button
      //             onClick={() => {
      //               setshowForgotPasswordModal(false);
      //             }}
      //             className="px-5 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
      //           >
      //             Cancel
      //           </button>
      //           <button
      //             disabled={!forgotPasswordForm.email}
      //             className="flex gap-2 bg-[#646FC6] hover:bg-[#646FC6]/90 w-fit text-[#ffff] p-5 py-2.5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
      //           >
      //             <div
      //               className={
      //                 "flex justify-center " + (!isPending && " hidden")
      //               }
      //             >
      //               <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      //             </div>
      //             Reset
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      }
    </>
  );
};

export default SigninForm;
