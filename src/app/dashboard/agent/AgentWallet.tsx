"use client";
import {
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  RefreshCcw,
  TrendingDown,
  TrendingUp,
  UsersRound,
  Wallet,
  Wallet2,
} from "lucide-react";
import React, { useState } from "react";
import { usewallet } from "../../customHooks/UseQueries";
import { selectOption } from "../../util/functions";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useWalletMutation } from "../../customHooks/useMutation";
import { numRegex } from "../../constants/constant";

const AgentWallet = () => {
  const [fund, setFund] = useState(true);
  const { data, isLoading, isError, refetch, isFetching } = usewallet();

  const [form, setForm] = useState({
    amount: "",
  });

  const { mutateAsync, isPending } = useWalletMutation();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!numRegex.test(form.amount) || parseInt(form.amount) < 1000)
        return toast.info("Amount must be a number and greater than 1000");
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
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
          Wallet Overview
          <button className="ml-3" onClick={() => refetch()}>
            <RefreshCcw />
          </button>
        </h1>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold ">
          Manage your wallet balance and transactions
        </p>
      </div>
      <div
        className={
          " mt-6 rounded-xl w-full " +
          (isLoading || isPending || isFetching ? " h-[230px] shimmer" : " ")
        }
      >
        <div
          className={
            "flex flex-col justify-end gap-5 bg-linear-to-r from-[#646FC6] to-[#646FC6] h-full p-5  w-full rounded-xl text-[#FFFFFF] " +
            ((isLoading || isPending || isFetching) && " hidden")
          }
        >
          <p className=" w-fit">Withdraw Commission</p>
          <div className="">
            <h2 className="flex justify-between font-bold text-3xl leading-6 capitalize truncate">
              ₦{isError ? 0 : data?.walletBalance}
            </h2>
            <p className="font-medium text-sm mt-3">Available Balance</p>
          </div>
          <div className=" flex w-full font-semibold text-sm gap-5 max-xs:flex-col max-w-[700px]">
            <button className="bg-[#FFFFFF] text-[#000000] rounded-lg flex-1 p-2 flex justify-center items-center gap-2 capitalize ">
              <span>
                <Wallet size={12} />
              </span>
              To wallet
            </button>
            <button className="bg-[#FFFFFF] rounded-lg flex-1 p-2 text-[#000000] flex justify-center items-center gap-2 capitalize ">
              <span>
                <TrendingDown size={12} />
              </span>
              To bank
            </button>
          </div>
        </div>
      </div>
      {/* the 3 boxes containter */}
      <div className="flex w-full gap-4 mt-6 flex-wrap max-[1100px]:justify-center justify-between">
        <div
          className={
            " gap-9 bg-[#E0E1F31A] h-[200px] p-5 w-full max-w-[400px] inset-shadow-sm inset-shadow-[#00000040] rounded-xl flex justify-between border-2 border-[#AAAAAA33] " +
            (isLoading || isPending || isFetching ? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-full flex flex-col justify-around flex-9 " +
              (isLoading || isPending || isFetching ? " hidden" : " ")
            }
          >
            <h2 className="flex justify-between text-lg font-medium leading-6 capitalize text-[#808080]">
              Total Credited{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#000000]">
                {data?.data?.walletBalance || "₦45,459.00"}
              </p>
              <p className="font-bold text-xs text-[#27C840]">This month</p>
            </div>
          </div>
          <span
            className={
              "bg-[#27C8404D] max-w-fit p-2 rounded-lg w-fit ml-auto h-fit flex-1 self-center-safe " +
              (isLoading || isPending || isFetching ? " hidden" : " ")
            }
          >
            {" "}
            <ArrowDownRight color="#27C840" />
          </span>
        </div>
        <div
          className={
            " gap-9 bg-[#E0E1F31A] h-[200px] p-5 w-full max-w-[400px] inset-shadow-sm inset-shadow-[#00000040] rounded-xl flex justify-between border-2 border-[#AAAAAA33] " +
            (isLoading || isPending || isFetching ? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-full flex flex-col justify-around flex-9 " +
              (isLoading || isPending || isFetching ? " hidden" : " ")
            }
          >
            <h2 className="flex justify-between text-lg font-medium leading-6 capitalize text-[#808080]">
              Total Debited{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#000000]">
                {data?.data?.walletBalance || "₦45,459.00"}
              </p>
              <p className="font-bold text-xs text-[#808080]">This month</p>
            </div>
          </div>
          <span
            className={
              "bg-[#646FC64D] max-w-fit p-2 rounded-lg w-fit ml-auto h-fit flex-1 self-center-safe " +
              (isLoading || isPending || isFetching ? " hidden" : " ")
            }
          >
            {" "}
            <ArrowUpRight color="#646FC6" />
          </span>
        </div>
        <div
          className={
            " gap-9 bg-[#E0E1F31A] h-[200px] p-5 w-full max-w-[400px] inset-shadow-sm inset-shadow-[#00000040] rounded-xl flex justify-between border-2 border-[#AAAAAA33] " +
            (isLoading || isPending || isFetching ? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-full flex flex-col justify-around flex-9 " +
              (isLoading || isPending || isFetching ? " hidden" : " ")
            }
          >
            <h2 className="flex justify-between text-lg font-medium leading-6 capitalize text-[#808080]">
              Net Balance{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#000000]">
                {data?.data?.walletBalance || "₦45,459.00"}
              </p>
              <p className="font-bold text-xs text-[#808080]">Current</p>
            </div>
          </div>
          <span
            className={
              "bg-[#646FC64D] max-w-fit p-2 rounded-lg w-fit ml-auto h-fit flex-1 self-center-safe " +
              (isLoading || isPending || isFetching ? " hidden" : " ")
            }
          >
            {" "}
            <Wallet2 color="#646FC6" />
          </span>
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
          {data?.recentTransactions && data?.recentTransactions.length > 0 ? (
            <ul
              className={
                "h-full flex flex-col gap-10 w-full  " +
                (isLoading && " hidden")
              }
            >
              {data.recentTransactions.map((trans: any, index: number) => (
                <li
                  key={index}
                  className="bg-[#AAAAAA33] flex p-5 justify-between rounded-xl text-end items-center"
                >
                  <div className="flex gap-5 items-center max-w-[60%]">
                    {trans.type == "Credit" ? (
                      <div className="p-3 bg-[#10AA3E1A] rounded-full">
                        <TrendingUp color="#10AA3E" />
                      </div>
                    ) : (
                      <div className="p-3 bg-[#FF00001A] rounded-full">
                        <TrendingDown color="#FF0000" />
                      </div>
                    )}
                    <div className="flex-2 truncate">
                      <h4 className="capitalize font-medium text-sm truncate ">
                        {trans.purpose}
                      </h4>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h5 className="font-medium text-sm">₦{trans.amount}</h5>
                      <p className="text-[#757575] text-sm">
                        {new Date(trans.createdAt).toDateString()}
                      </p>
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

export default AgentWallet;
