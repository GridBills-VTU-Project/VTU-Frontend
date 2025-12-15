"use client";
import { selectOption } from "@/app/util/functions";
import React, { FormEvent, useState } from "react";
import { numRegex } from "../constants/constant";
import { toast } from "react-toastify";
import UseAxios from "../customHooks/UseAxios";
import { isAxiosError } from "axios";
import validator from "validator";

const Become_an_agent = () => {
  const [supportForm, setSupportForm] = useState({
    email: "",
    name: "",
    address: "",
    bank: "",
    account: "",
  });
  const [loading, setLoading] = useState(false);
  const api = UseAxios();

  const submit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(supportForm);
      if (!supportForm.name.trim()) {
       return toast.info("Please enter full name.");
      } else if (!validator.isEmail(supportForm.email)) {
       return toast.info("Email must be a valid email.");
      } else if (!supportForm.address.trim()) {
       return toast.info("Please enter Address.");
      } else if (!supportForm.bank.trim()) {
       return toast.info("Please enter Bank Number.");
      } else if (!supportForm.account || !numRegex.test(supportForm.account) || supportForm.account.length < 10) {
       return toast.info("Please enter a valid account number.");
      }
      // setSupportForm(prev => ({...prev,name:supportForm.name.replace(" ","_")}))
      const res = await api.post("auth/user", JSON.stringify(supportForm));
      toast.success(res.data.msg || "Success.");
      setSupportForm({
        email: "",
        name: "",
        address: "",
        bank: "",
        account: "",
      });
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

  return (
    <div>
      {" "}
      <h1 className=" max-xs:text-2xl text-3xl font-black not-xl:text-2xl leading-6 mb-3">
        Become an Agent
      </h1>
      <p className=" leading-6 text-sm text-[#727272] mb-7 max-sm:text-xs">
        Fill/Update Your details
      </p>
      <form
        onSubmit={submit}
        action=""
        className="flex flex-col max-w-[700px] py-7 px-5 bg-[##AAAAAA0D] rounded-lg border-2 border-[#AAAAAACC]"
      >
        <div className="flex flex-col pb-10">
          <p className="mb-2">Email</p>
          <input
            name="email"
            value={supportForm.email}
            onChange={(e) => selectOption(e, setSupportForm)}
            type="text"
            className="border-2 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg bg-[#FFFFFF3B]/23"
            placeholder="you@gmail.com"
          />
        </div>
        <div className="flex flex-col pb-10">
          <p className="mb-2">Full Name</p>
          <input
            name="name"
            value={supportForm.name}
            onChange={(e) => selectOption(e, setSupportForm)}
            type="text"
            className="border-2 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg bg-[#FFFFFF3B]/23"
            placeholder="enter name"
          />
        </div>
        <div className="flex flex-col pb-10">
          <p className="mb-2">Address</p>
          <input
            name="address"
            value={supportForm.address}
            onChange={(e) => selectOption(e, setSupportForm)}
            type="text"
            className="border-2 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg bg-[#FFFFFF3B]/23"
            placeholder="enter address"
          />
        </div>
        <div className="flex flex-col pb-10">
          <p className="mb-2">Bank Name</p>
          <input
            name="bank"
            value={supportForm.bank}
            onChange={(e) => selectOption(e, setSupportForm)}
            type="text"
            className="border-2 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg bg-[#FFFFFF3B]/23"
            placeholder="enter bank name"
          />
        </div>
        <div className="flex flex-col pb-10">
          <p className="mb-2">Account Number</p>
          <input
            name="account"
            value={supportForm.account}
            onChange={(e) => selectOption(e, setSupportForm)}
            type="text"
            className="border-2 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg bg-[#FFFFFF3B]/23"
            placeholder="enter account number"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center items-center gap-2 bg-[#646FC6] sm:w-[40%] w-[90%] text-[#ffff] mt-15 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer hover:bg-[#646fc6]/90 "
        >
          <div className={"flex justify-center " + (!loading && " hidden")}>
            <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          Request
        </button>
      </form>
    </div>
  );
};

export default Become_an_agent;
