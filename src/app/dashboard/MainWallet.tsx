"use client";
import { transactions } from "@/app/constants/sidebarConstants";
import UseAxios from "@/app/customHooks/UseAxios";
import { getDashboard } from "@/app/lib/Api";
import { useQuery } from "@tanstack/react-query";
import { Plus, TrendingDown, Wallet } from "lucide-react";
import Image from "next/image";
import React from "react";

const MainWallet = () => {
  const api = UseAxios();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(api),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes: consider data fresh
    // refetchInterval: 10000, // optional: auto-refetch every 10s
  });
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
              ₦{data?.data.walletBalance || 0}
            </h2>
            <p className="font-medium text-sm mt-3 text-center">
              Available Balance
            </p>
          </div>
          <div className=" flex w-full font-semibold text-sm gap-5 max-xs:flex-col">
            <button className="bg-[#36C329] rounded-lg flex-1 p-2 flex justify-center items-center gap-2 ">
              <span>
                <Plus size={12} />
              </span>
              Fund Wallet
            </button>
            <button className="bg-[#FFFFFF] rounded-lg flex-1 p-2 text-[#000000] flex justify-center items-center gap-2 ">
              <span>
                <TrendingDown size={12} />
              </span>
              Borrow Funds
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[800px]">
        <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
          Transaction History
        </h3>
        <div
          className={
            "h-[90%] overflow-auto flex justify-center items-center " +
            (isLoading && " shimmer")
          }
        >
          {data?.data.recentTransactions &&
          data?.data.recentTransactions.length > 0 ? (
            <ul
              className={
                "h-full flex flex-col gap-10  " + (isLoading && " hidden")
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
