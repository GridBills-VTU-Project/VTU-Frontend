"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignupForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isChecked: false,
  });
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.isChecked) {
      toast.error("please check the box.");
      return;
    }

    try {
      console.log(form);
      toast.success("success.");
      localStorage.setItem("vtuPendingEmail", form.email);
      router.push("/pages/otp");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong.");
    }
  };
  const selectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;

    if (name === "isChecked") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form
      onSubmit={submit}
      action=""
      className="flex flex-col px-15 rounded-lg w-full max-xl:mb-20"
    >
      <p className="mb-2">Full Name</p>
      <input
        name="name"
        value={form.name}
        onChange={selectOption}
        type="text"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
        placeholder="Please enter your name"
      />
      <p className="mt-10">Email Address</p>
      <input
        name="email"
        value={form.email}
        onChange={selectOption}
        type="email"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
        placeholder="Please enter your name"
      />
      <p className="mt-10">Phone Number</p>
      <input
        name="phone"
        value={form.phone}
        onChange={selectOption}
        type="tel"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
        placeholder="Please enter your number"
      />
      <p className="mt-10">Password</p>
      <input
        name="password"
        value={form.password}
        onChange={selectOption}
        type="password"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
        placeholder="***************"
      />
      <div className="mt-10 flex gap-3">
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
      </div>

      <button className="bg-[#646FC6] w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer ">
        Send Message
      </button>
    </form>
  );
};

export default SignupForm;
