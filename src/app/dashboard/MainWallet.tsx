'use client';
import { transactions } from "@/app/constants/sidebarConstants";
import { Plus, TrendingDown, Wallet } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDashboard } from "../customHooks/UseQueries";
import { selectOption } from "../util/functions";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useWalletMutation } from "../customHooks/useMutation";

const MainWallet = () => {
  const [fund, setFund] = useState(true);
  const { data, isLoading, isError } = useDashboard();
  const [form, setForm] = useState({
    amount: "",
  });

  const { mutateAsync, isPending } = useWalletMutation();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!parseFloat(form.amount))
        return toast.error("Amount must be a number");
      await mutateAsync({
        amount: form.amount,
        type: fund ? "fund" : "borrow",
      });
    } catch (error: any) {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error(error.message || "Failed");
    }
  };
  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl">
          Wallet
        </h1>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold ">
          Manage your wallet balance and transactions
        </p>
      </div>
      <div
        className={
          "h-[250px] max-xs:h-[300px] mt-6 rounded-xl  " +
          (isLoading && " shimmer")
        }
      >
        <div
          className={
            "flex flex-col justify-end gap-5 bg-linear-to-r from-[#007AFF] to-[#C457BD] h-full p-5 w-full rounded-xl text-[#FFFFFF] " +
            (isLoading && " hidden")
          }
        >
          <span className="bg-[#F9FBFF4D] p-1 rounded-lg w-fit ml-auto mb-auto">
            <Wallet />
          </span>
          <div className="mx-auto">
            <h2 className="flex justify-between font-bold text-3xl leading-6 capitalize text-center">
              ₦{!isError ? data?.data.walletBalance : 2}
            </h2>
            <p className="font-medium text-sm mt-3 text-center">
              Available Balance
            </p>
          </div>
          <div className=" flex w-full font-semibold text-sm gap-5 max-xs:flex-col max-w-[700px] mx-auto">
            <button
              onClick={() => setFund(true)}
              className="bg-[#36C329] rounded-lg flex-1 p-2 flex justify-center items-center gap-2 "
            >
              <span>
                <Plus size={12} />
              </span>
              Fund Wallet
            </button>
            <button
              onClick={() => setFund(false)}
              className="bg-[#FFFFFF] rounded-lg flex-1 p-2 text-[#000000] flex justify-center items-center gap-2 "
            >
              <span>
                <TrendingDown size={12} />
              </span>
              Borrow Funds
            </button>
          </div>
        </div>
      </div>
      {fund ? (
        <form
          onSubmit={submit}
          className="flex flex-col bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10 w-full"
        >
          <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
            Fund Your Wallet
          </h3>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="mt-10">Amount (₦)</p>
              <input
                value={form.amount}
                name="amount"
                required={true}
                onChange={(e) => {
                  selectOption(e, setForm);
                }}
                type="text"
                className="p-5 rounded-lg bg-[#EEEEEE] focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            <button
              disabled={isPending}
              className="flex justify-center gap-2 bg-[#646FC6] hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
            >
              <div
                className={"flex justify-center " + (!isPending && " hidden")}
              >
                <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              Proceed to Payment
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={submit}
          className="flex flex-col bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10 w-full"
        >
          <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
            Borrow Fund
          </h3>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="mt-10">Amount (₦)</p>
              <input
                value={form.amount}
                name="amount"
                required={true}
                onChange={(e) => {
                  selectOption(e, setForm);
                }}
                type="text"
                className="p-5 rounded-lg bg-[#EEEEEE] focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            <button
              disabled={isPending}
              className="flex justify-center gap-2 bg-[#646FC6] hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
            >
              <div
                className={"flex justify-center " + (!isPending && " hidden")}
              >
                <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              Proceed to Payment
            </button>
          </div>
        </form>
      )}
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[800px] w-full">
        <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
          Transaction History
        </h3>
        <div
          className={
            "h-[90%] overflow-auto flex justify-center items-center w-full " +
            (isLoading && " shimmer")
          }
        >
          {data?.data.recentTransactions &&
          data?.data.recentTransactions.length > 0 ? (
            <ul
              className={
                "h-full flex flex-col gap-10 w-full  " +
                (isLoading && " hidden")
              }
            >
              {transactions.map((trans, index) => (
                <li
                  key={index}
                  className="bg-[#AAAAAA33] flex p-5 justify-between rounded-xl text-end"
                >
                  <div className="flex w-40 gap-5">
                    <Image
                      className="bg-[#D9D9D9] rounded-full p-2 w-10 h-10"
                      src={trans.img}
                      width={0}
                      height={0}
                      alt={`${trans.name} icon`}
                    />
                    <div className="">
                      <h4 className="capitalize font-medium text-sm">
                        {trans.name}
                      </h4>
                      <p className="text-[#757575] text-sm uppercase text-start">
                        {trans.sp}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h5 className="font-medium text-sm">₦{trans.amount}</h5>
                      <p className="text-[#757575] text-sm">{trans.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={" " + (isLoading && " hidden")}>
              {" "}
              No Recent transactions
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainWallet;
