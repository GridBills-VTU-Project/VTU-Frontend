"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SigninForm = () => {
  const [form, setForm] = useState({
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
      <input
        value={form.password}
        name="password"
        required={true}
        onChange={selectOption}
        type="password"
        className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
        placeholder="***************"
      />
      <div className="mt-10 flex gap-3">
        <input
          name="isChecked"
          required={true}
          checked={form.isChecked}
          onChange={selectOption}
          type="checkbox"
          className="p-5 rounded-lg"
          placeholder="***************"
        />
        <p className="leading-6 text-sm text-[#727272] max-sm:text-xs">
          Remember Password
        </p>
      </div>

      <button className="bg-[#646FC6] hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer ">
        Send Message
      </button>
    </form>
  );
};

export default SigninForm;
