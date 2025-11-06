"use client";
import { quickActions, transactions } from "@/app/constants/sidebarConstants";
import UseAxios from "@/app/customHooks/UseAxios";
import { getDashboard } from "@/app/lib/Api";
import { useQuery } from "@tanstack/react-query";
import { Wallet, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Maindasboard = () => {
  const api = UseAxios();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(api),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes: consider data fresh
    // refetchInterval: 10000, // optional: auto-refetch every 10s
  });
  console.log(data?.data);

  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl">
          Dashboard Overview
        </h1>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold mt-4">
          Welcome back! Here is what is happening in your Account
        </p>
      </div>
      <div className="flex w-full gap-4 mt-6 flex-wrap max-lg:justify-center justify-between">
        <div
          className={
            " gap-9 bg-linear-to-b from-[#1122AE]/60 to-[#D345A4]/60 h-[200px] p-5 w-full max-w-[400px] rounded-xl text-[#FFFFFF] flex flex-col justify-between" +
            (isLoading ? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-[60%] flex flex-col justify-between" +
              (isLoading ? " hidden" : " ")
            }
          >
            <h2 className="flex justify-between text-lg font-medium leading-6 capitalize">
              Wallet Balance{" "}
              <span className="bg-[#1B9915] p-1 rounded-lg">
                {" "}
                <Wallet />
              </span>
            </h2>
            <div>
              <p className="font-bold text-2xl">
                ₦{data?.data?.walletBalance || 0}
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            "gap-9 bg-linear-to-b from-[#1122AE]/60 to-[#D345A4]/60 h-[200px] p-5 w-full max-w-[400px] rounded-xl text-[#FFFFFF] flex flex-col justify-between" +
            (isLoading ? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-[60%] flex flex-col justify-between" +
              (isLoading ? " hidden" : " ")
            }
          >
            <h2 className="flex justify-between text-lg font-medium leading-6 capitalize">
              Total Spent{" "}
              <span className="bg-[#646FC6] p-1 rounded-lg">
                {" "}
                <TrendingUp />
              </span>
            </h2>
            <div className="mt-3">
              <p className="font-bold text-2xl ">
                ₦{data?.data?.monthlySpend || 0}
              </p>
            </div>
          </div>
          <p className={"font-normal text-xs " + (isLoading && " hidden")}>
            This Month
          </p>
        </div>
        <div
          className={
            "gap-9 bg-linear-to-b from-[#1122AE]/60 to-[#D345A4]/60 h-[200px] p-5 w-full max-w-[400px] rounded-xl text-[#FFFFFF] flex flex-col justify-between" +
            (isLoading ? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-[60%] flex flex-col justify-between" +
              (isLoading ? " hidden" : " ")
            }
          >
            <h2 className="flex justify-between text-lg font-medium leading-6 capitalize">
              Points Earned{" "}
              <span className="bg-[#1B9915] p-1 rounded-lg">
                {" "}
                <Wallet />
              </span>
            </h2>
            <div>
              <p className="font-bold text-2xl ">
                {data?.data?.rewardPoints || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 ">
        <h3 className="capitalize font-bold text-3xl text-[#163145] ">
          Quick actions
        </h3>
        <div className="flex gap-4 mt-10 p-2 flex-wrap justify-center">
          {quickActions.map((action, index) => (
            <Link
              href={`dashboard?tab=services&section=${action.query}`}
              key={index}
              className="bg-[#AAAAAA1A] w-full max-w-[200px] h-[120px] rounded-xl flex flex-col items-center justify-center gap-4 border-2 border-[#0000001A]"
            >
              <Image
                className=""
                src={action.img}
                width={20}
                height={20}
                alt={`${action.name} icon`}
              />
              <h4 className="font-semibold text-xs">{action.name}</h4>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[800px]">
        <h3 className="capitalize font-bold text-3xl  text-[#163145] mb-10">
          Recent Transactions
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

export default Maindasboard;
