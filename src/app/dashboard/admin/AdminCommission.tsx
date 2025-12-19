"use client";
import {
  RefreshCcw,
  UsersRound,
  Users,
  Search,
  Copy,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import React from "react";
import { useAuthUser, useDashboard } from "../../customHooks/UseQueries";
import { mockData } from "@/app/constants/constant";
import { handleCopy } from "@/app/util/functions";

export default function AdminCommission() {
  const { data, isLoading, isError, refetch, isFetching, isPending } =
    useDashboard();

  return (
    <div className="w-full bg-[#F2F2F7]">
      {/* header message */}
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
          Agent Management
          <button className="ml-3" onClick={() => refetch()}>
            <RefreshCcw />
          </button>
        </h1>
        <p className="text-[#7D7979] text-lg font-bold mt-4">
          Manage agents, commissions and performance
        </p>
      </div>
      <div className="flex w-full gap-4 mt-6 flex-wrap max-[1100px]:justify-center justify-between">
        <div
          className={
            " gap-9 bg-[#FFFFFF] h-[200px] p-5 w-full max-w-[400px] shadow-sm shadow-[#00000040] rounded-xl flex justify-between border-2 border-[#AAAAAA33] " +
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
              Total Commissions Paid{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#1DC81D]">
                {data?.data?.walletBalance || "₦45,459.00"}
              </p>
              <p className="font-bold text-xs text-[#808080]">
                Across all users
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            " gap-9 bg-[#FFFFFF] h-[200px] p-5 w-full max-w-[400px] shadow-sm shadow-[#00000040] rounded-xl flex justify-between border-2 border-[#AAAAAA33] " +
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
              Total Points Gained{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#1526DD]">
                {data?.data?.walletBalance || "₦45,459.00"}
              </p>
              <p className="font-bold text-xs text-[#808080]">Current</p>
            </div>
          </div>
        </div>
        <div
          className={
            " gap-9 bg-[#FFFFFF] h-[200px] p-5 w-full max-w-[400px] shadow-sm shadow-[#00000040] rounded-xl flex justify-between border-2 border-[#AAAAAA33] " +
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
               Commission Rate{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#FF3B30]">
                {data?.data?.walletBalance || "₦45,459.00"}
              </p>
              <p className="font-bold text-xs text-[#808080]">Current</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col gap-2 py-7 px-5 bg-[#FFFFFF] rounded-lg border-2 border-[#AAAAAACC]">
        <h2 className=" max-xs:text-2xl text-3xl font-semibold not-xl:text-2xl leading-6 mb-1 text-darkbackground">
          Agent Commission Rules
        </h2>
        <p className="mb-2 text-textlight font-medium text-lg">
          Set default commission rates for different services
        </p>
        <div className="flex gap-2 lg:gap-10 flex-col ">
          <div className="w-full flex">
            <div className="flex flex-col flex-1">
              <p className="mb-2 text-darkbackground font-medium text-lg">
                Service Commission Rate
              </p>
              <div className="flex items-center gap-5">
                <input
                  disabled={true}
                  name="first_name"
                  // value={user?.id}
                  // onChange={(e) => selectOption(e, setPasswordForm)}
                  type="text"
                  className={
                    " outline-darkbackground border-2 border-[#7575754D] p-4 rounded-2xl bg-[#8080801A] flex-2"
                  }
                  placeholder="Enter first name"
                />
                <button
                  onClick={() => handleCopy("")}
                  className="flex bg-[#8080801A] p-5 gap-1 py-4 border-2 border-[#7575754D] rounded-lg"
                >
                  {/* <Copy size={20} /> */}
                  <p className="text-sm">Edit</p>
                </button>
                <button
                  onClick={() => handleCopy("")}
                  className="flex bg-[#8080801A] p-5 gap-1 py-4 border-2 border-[#7575754D] rounded-lg"
                >
                  {/* <Copy size={20} /> */}
                  <p className="text-sm">Update</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[800px] w-full">
        <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
          Commission Statistics
        </h3>
        <p className="text-[#7D7979] text-lg font-bold mt-1">
          Monthly breakdown of agent commissions by service
        </p>
        <div
          className={
            "h-[90%] mt-10 overflow-auto flex justify-center items-center w-full " +
            (isLoading && " shimmer")
          }
        >
          {true && true ? (
            <ul
              className={
                "h-full flex flex-col gap-10 w-full  " +
                (isLoading && " hidden")
              }
            >
              {mockData.map((trans: any, index: number) => (
                <li
                  key={index}
                  className="bg-[#AAAAAA33] flex p-5 justify-between rounded-xl text-end items-center"
                >
                  <div className="flex gap-5 items-center max-w-[60%]">
                    {/* {trans.type == "Credit" ? (
                      <div className="p-3 bg-[#10AA3E1A] rounded-full">
                        <TrendingUp color="#10AA3E" />
                      </div>
                    ) : ( */}
                      {/* <div className="p-3 bg-[#FF00001A] rounded-full">
                        <TrendingDown color="#FF0000" />
                      </div> */}
                    {/* )} */}
                    <div className="flex-2 text-start">
                      <h4 className="capitalize font-medium text-sm truncate ">
                        {trans.type}
                      </h4>
                      <p className="text-textlight text-xs font-bold mt-1">
                        Manage agents, commissions and performance
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h5 className="font-medium text-sm text-blue">₦{trans.user_Id}</h5>
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
}
