"use client";
import {
  RefreshCcw,
  Search,
} from "lucide-react";
import React from "react";
import { useDashboard } from "../../customHooks/UseQueries";
import { mockData } from "@/app/constants/constant";

export default function Agents() {
  const { data, isLoading, isError, refetch, isFetching, isPending } =
    useDashboard();
  return (
    <div className="w-full">
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
              Total Agents{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#1DC81D]">
                {data?.data?.walletBalance || "₦45,459.00"}
              </p>
              {/* <p className="font-bold text-xs text-[#808080]">Across all users</p> */}
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
              Pending Agent Approval{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#1526DD]">
                {data?.data?.walletBalance || "₦45,459.00"}
              </p>
              {/* <p className="font-bold text-xs text-[#808080]">Current</p> */}
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
              Pending Withdrawals{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#FF3B30]">
                {data?.data?.walletBalance || "₦45,459.00"}
              </p>
              {/* <p className="font-bold text-xs text-[#808080]">Current</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[700px]">
        <h3 className="capitalize font-bold text-3xl  text-darkbackground ">
          All Agents
        </h3>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-medium ">
          Search, filter and manage agent accounts
        </p>
        <div className="flex my-5">
          <input
            name="batch number"
            // onChange={(e) => setBatchSearch(e.target.value)}
            type="search"
            className="p-2 rounded-l-lg bg-[#EEEEEE] outline-[#646FC6] text-sm max-sm:text-[16px] w-full"
            placeholder="Search by name or email"
          />
          <button
            className={
              "bg-[#646FC6] p-2 rounded-r-lg "
              // +(batchSearch=="" && " bg-[#646fc6]/30 hover:!cursor-not-allowed")
            }
            // disabled={batchSearch == ""}
            // onClick={() => handleSearch(batchSearch)}
            // {}
          >
            <Search color="white" />
          </button>
        </div>
        <div className=" bg-[#FFFFFF] mt-10 border-2 border-[#AAAAAA] rounded-xl w-full overflow-auto max-h-[500px] min-h-[500px] h-[500px]">
          <table className=" min-w-[700px] w-full table-fixed border-collapse max-h-[200px] min-h-[200px] h-[200px]">
            <thead className=" text-start">
              <tr className="border-b border-zinc-200 text-center">
                <th
                  scope="col"
                  className="px-4 py-3 text-2xl font-medium text-start"
                >
                  Agent
                </th>
                <th scope="col" className="px-4 py-3 text-2xl font-medium">
                 Commission Rate
                </th>
                <th scope="col" className="px-4 py-3 text-2xl font-medium">
                  Total Sales
                </th>
                <th scope="col" className="px-4 py-3 text-2xl font-medium">
                  Pending Payout
                </th>
                <th scope="col" className="px-4 py-3 text-2xl font-medium">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-2xl font-medium">
                  
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200 text-center max-h-[200px] min-h-[200px] h-[200px]">
              {mockData && mockData.length > 0 ? (
                mockData?.map((r, idx) => (
                  <tr key={idx} className=" divide-zinc-200">
                    <td className="px-4 py-4 text-lg font-medium text-start capitalize text-[#163145] truncate">
                      {r.user_Id}
                      <p className="text-sm text-[#7D7979] lowercase">
                        davidmuoegbunam@gmail.com
                      </p>
                    </td>
                    <td className="">
                      
                       3.0%
                      
                    </td>
                    <td className="px-4 py-4 text-lg truncate">{r.custum_3}</td>
                    <td className="text-center truncate">{r.custum_3}</td>
                    <td className="px-4 py-4 text-lg truncate">
                      <p
                        className={
                          " text-lg rounded-full max-w-40 text-center mx-auto py-1 text-white" +
                          (r.custum_4 === "Active"
                            ? " bg-[#1526DD]"
                            : " bg-[#1526DD33]")
                        }
                      >
                        {r.custum_4}
                      </p>
                    </td>
                    <td className="">
                      <button
                        className={
                          "px-4 py-1 font-semibold text-lg rounded-lg w-40 text-center mx-auto text-white " +
                          (r.custum_4 != "Active"
                            ? " bg-[#1526DD] hover:!bg-[#1526dd]/90"
                            : " bg-[#1526DD33] hover:bg-[#1526DD33]/90")
                        }
                      >
                       {r.custum_4 === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm">
                    {"No record found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// export default Admindasboard;