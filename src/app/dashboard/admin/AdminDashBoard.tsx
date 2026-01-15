"use client";
import {
  RefreshCcw,
  UsersRound,
  Users,
  Clock3,
} from "lucide-react";
import React from "react";
import {  useGetAdminDashboard } from "../../customHooks/UseQueries";
import { formatAmount } from "@/app/util/functions";

const Admindasboard = () => {
  const { data, isLoading, isError, refetch, isFetching, isPending } =
    useGetAdminDashboard();
  return (
    <div className="w-full">
      {/* header message */}
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
          Dashboard Overview
          <button className="ml-3" onClick={() => refetch()}>
            <RefreshCcw />
          </button>
        </h1>
        <p className="text-[#7D7979] text-lg font-bold">
          Monitor your VTU platform performance
        </p>
      </div>
      <div className="flex w-full gap-4 mt-6 flex-wrap max-[1100px]:justify-center justify-between">
        <div
          className={
            " gap-9 bg-[#E0E1F31A] h-[200px] p-5 w-full max-w-[300px] inset-shadow-sm inset-shadow-[#00000040] rounded-xl flex flex-col justify-around   border-2 border-[#AAAAAA33] " +
            (isLoading || isPending || isFetching ? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-[60%] flex flex-col justify-between" +
              (isLoading || isPending || isFetching ? " hidden" : " ")
            }
          >
            <h2 className="flex justify-between text-lg font-medium leading-6 capitalize text-[#808080]">
              Total Users{" "}
              <span className="bg-[#989CF54D] p-2 rounded-lg">
                {" "}
                <UsersRound color="#141DF0" />
              </span>
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#000000]">
                {data?.totalUsers || 0}
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            " gap-9 bg-[#DCFADC] h-[200px] p-5 w-full max-w-[300px] inset-shadow-sm inset-shadow-[#00000040] rounded-xl flex flex-col justify-around   border-2 border-[#AAAAAA33] " +
            (isLoading || isPending || isFetching ? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-[60%] flex flex-col justify-between" +
              (isLoading || isPending || isFetching ? " hidden" : " ")
            }
          >
            <h2 className="flex justify-between text-lg font-medium leading-6 capitalize text-[#808080]">
              Active Users{" "}
              <span className="bg-[#A0F5A04D] p-2 rounded-lg">
                {" "}
                <Users color="#23D423" />
              </span>
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#000000]">
                {data?.activeUsers || 0}
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            " gap-9 bg-[#DCFADC] h-[200px] p-5 w-full max-w-[300px] inset-shadow-sm inset-shadow-[#00000040] rounded-xl flex flex-col justify-around   border-2 border-[#AAAAAA33] " +
            (isLoading || isPending || isFetching ? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-[60%] flex flex-col justify-between" +
              (isLoading || isPending || isFetching ? " hidden" : " ")
            }
          >
            <h2 className="flex justify-between text-lg font-medium leading-6 capitalize text-[#808080]">
              Active Agents{" "}
              <span className="bg-[#A0F5A04D] p-2 rounded-lg">
                {" "}
                <Users color="#23D423" />
              </span>
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#000000]">
                {data?.activeAgents || 0}
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            " gap-9 bg-[#FFF9EF] h-[200px] p-5 w-full max-w-[300px] inset-shadow-sm inset-shadow-[#00000040] rounded-xl flex flex-col justify-around border-2 border-[#AAAAAA33] " +
            (isLoading || isPending || isFetching ? " shimmer" : " ")
          }
        >
          <div
            className={
              "h-[60%] flex flex-col justify-between" +
              (isLoading || isPending || isFetching ? " hidden" : " ")
            }
          >
            <h2 className="flex justify-between text-lg font-medium leading-6 capitalize text-[#808080]">
              Pending Withdrawals{" "}
              <span className="bg-[#FDCC734D] p-2 rounded-lg">
                {" "}
                <Clock3 color="#FFA500" />
              </span>
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#000000]">
                {data && data.pendingWithdrawals ? formatAmount(data.pendingWithdrawals) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 flex flex-col gap-10">
        <div className="">
          <h3 className="capitalize font-bold text-3xl text-[#163145] ">
            Quick Stats
          </h3>
          <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold ">
            This month's performance
          </p>
        </div>
        <div
          className={
            "  mt-10 p-2 flex justify-between"
          }
        >
          <div
            className=" w-[200px] h-[120px] rounded-xl flex flex-col items-start justify-start gap-1 text-start"
          >
            <h4 className="font-semibold text-[#7D7979] text-lg">Total Transactions</h4>
            <p className="font-bold text-3xl text-[#163145]">{data && data.totalTransactionsThisMonth? formatAmount(data.totalTransactionsThisMonth) : 0}</p>
            <p className="font-bold text-xs text-[#34C759]" >Transactions</p>
          </div>
          <div
            className=" w-[200px] h-[120px] rounded-xl flex flex-col items-start justify-start gap-1 text-start"
          >
            <h4 className="font-semibold text-[#7D7979] text-lg">Monthly Revenue</h4>
            <p className="font-bold text-3xl text-[#163145]">₦{data && data.revenueMonth ? formatAmount(data.revenueMonth) : 0}</p>
            <p className="font-bold text-xs text-[#34C759]" >Revenue</p>
          </div>
          <div
            className=" w-[200px] h-[120px] rounded-xl flex flex-col items-start justify-start gap-1 text-start"
          >
            <h4 className="font-semibold text-[#7D7979] text-lg">Total commission paid</h4>
            <p className="font-bold text-3xl text-[#163145]">₦{data && data.totalCommissionThisMonth ? formatAmount(data.totalCommissionThisMonth) : 0}</p>
            <p className="font-bold text-xs text-[#34C759]" >Expense</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindasboard;
