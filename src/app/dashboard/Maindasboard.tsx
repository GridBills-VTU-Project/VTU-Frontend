"use client";
import { quickActions } from "@/app/constants/sidebarConstants";
import { Wallet, TrendingUp, Plus, TrendingDown, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UseRole from "../customHooks/UseRole";
import { useDashboard } from "../customHooks/UseQueries";
import { recentTransactions } from "../util/types";

const Maindasboard = () => {
  const canView = UseRole(["agent"]);
  const { data, isLoading, isError,refetch ,isFetching,isPending,} = useDashboard();
  return (
    <div className="w-full">
      {/* header message */}
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
          Dashboard Overview
          <button className="ml-3" onClick={()=>refetch()}>
            <RefreshCcw />
          </button>
        </h1>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold mt-4">
          Welcome back! Here is what is happening in your Account
        </p>
      </div>
      <div className="flex w-full gap-4 mt-6 flex-wrap max-[1100px]:justify-center justify-between">
        <div
          className={
            " gap-9 bg-linear-to-b from-[#1122AE]/60 to-[#D345A4]/60 h-[200px] p-5 w-full max-w-[400px] rounded-xl text-[#FFFFFF] flex flex-col justify-between" +
            ((isLoading || isPending||isFetching )? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-[60%] flex flex-col justify-between" +
              ((isLoading || isPending||isFetching )? " hidden" : " ")
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
            ((isLoading || isPending||isFetching )? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-[60%] flex flex-col justify-between" +
              ((isLoading || isPending||isFetching )? " hidden" : " ")
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
          <p className={"font-normal text-xs " + ((isLoading || isPending||isFetching )&& " hidden")}>
            This Month
          </p>
        </div>
        <div
          className={
            "gap-9 bg-linear-to-b from-[#1122AE]/60 to-[#D345A4]/60 h-[200px] p-5 w-full max-w-[400px] rounded-xl text-[#FFFFFF] flex flex-col justify-between" +
            ((isLoading || isPending||isFetching )? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-[60%] flex flex-col justify-between" +
              ((isLoading || isPending||isFetching )? " hidden" : " ")
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
        <div
          className={
            "gap-9 bg-linear-to-b from-[#1122AE]/60 to-[#D345A4]/60 h-[200px] p-5 w-full max-w-[400px] rounded-xl text-[#FFFFFF] flex flex-col justify-between" +
            ((isLoading || isPending||isFetching )? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-[60%] flex flex-col justify-between" +
              ((isLoading || isPending||isFetching )? " hidden" : " ")
            }
          >
            <h2 className="flex justify-between text-lg font-medium leading-6 capitalize">
              Borrow balance{" "}
              <span className="bg-[#FF0000] p-1 rounded-lg">
                {" "}
                <TrendingDown />
              </span>
            </h2>
            <div className="mt-3">
              <p className="font-bold text-2xl ">
                ₦{data?.data?.monthlySpend || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 ">
        <h3 className="capitalize font-bold text-3xl text-[#163145] ">
          Quick actions
        </h3>
        <div className={"  mt-10 p-2 " + (canView? " gap-x-40 gap-y-20 grid grid-cols-3 grid-rows-2 mx-auto max-w-fit max-[1200px]:grid-cols-2 max-[650px]:grid-cols-1" : " gap-4 flex flex-wrap justify-between max-[1150px]:justify-center")}>
          {canView && (
            <Link
              href={`dashboard?tab=wallet`}
              className="bg-[#24DB5B] text-[#ffff] w-[200px] h-[120px] rounded-xl flex items-center justify-center gap-4 border-2 border-[#0000001A]"
            >
              <div>
                <Plus />
              </div>
              <h4 className="font-semibold text-xs">Fund Wallet</h4>
            </Link>
          )}
          {quickActions.map((action, index) => (
            <Link
              href={`dashboard?tab=services&section=${action.query}`}
              key={index}
              className="bg-[#AAAAAA1A] w-[200px] h-[120px] rounded-xl flex flex-col items-center justify-center gap-4 border-2 border-[#0000001A]"
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
            ((isLoading || isPending||isFetching )&& " shimmer")
          }
        >
          {data?.data.recentTransactions &&
          data?.data.recentTransactions.length > 0 ? (
            <ul
              className={
                "h-full flex flex-col gap-10 w-full  " + ((isLoading || isPending||isFetching )&& " hidden")
              }
            >
              {data.data?.recentTransactions.map((trans:recentTransactions, index:number) => (
                <li
                  key={index}
                  className="bg-[#AAAAAA33] flex p-5 justify-between rounded-xl text-end items-center"
                >
                  <div className="flex gap-5 items-center">
                    {trans.type == "Credit" ?
                    <div className="p-3 bg-[#10AA3E1A] rounded-full">
                      <TrendingUp color="#10AA3E"/>
                    </div>
                    :
                    <div className="p-3 bg-[#FF00001A] rounded-full">
                      <TrendingDown color="#FF0000"/>
                    </div>
                    }
                    <div className="">
                      <h4 className="capitalize font-medium text-sm">
                        {trans.purpose}
                      </h4>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h5 className="font-medium text-sm">₦{trans.amount}</h5>
                      <p className="text-[#757575] text-sm">{new Date(trans.createdAt).toDateString()}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={" " + ((isLoading || isPending||isFetching )&& " hidden")}>
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
