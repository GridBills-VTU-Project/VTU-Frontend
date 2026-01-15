"use client";
import { RefreshCcw } from "lucide-react";
import React from "react";
import { useGetWalletOverview } from "../../customHooks/UseQueries";
import { formatAmount } from "@/app/util/functions";

export default function AdminWallet() {
  const { data, isLoading, isError, refetch, isFetching, isPending,isRefetching } =
    useGetWalletOverview();

  return (
    <div className="w-full bg-[#F2F2F7]">
      {/* header message */}
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
          Wallet Management
          <button className="ml-3" onClick={() => refetch()}>
            <RefreshCcw />
          </button>
        </h1>
        <p className="text-[#7D7979] text-lg font-bold mt-4">
          Monitor and manage wallet transactions
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
              Total Wallet Balance{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#1DC81D]">
                {/* ₦{data?.totalWalletBalance.toFixed(2) || "0"} */}
                ₦{data && data.totalWalletBalance ? formatAmount(data.totalWalletBalance): "0"}
              </p>
              <p className="font-bold text-xs text-[#808080]">Across all users</p>
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
              Today's Funding{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#1526DD]">
                ₦{data && data.todaysFunding ? formatAmount(data.todaysFunding): "0"}
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
              Borrowed Funds{" "}
            </h2>
            <div>
              <p className="font-bold text-2xl text-[#FF3B30]">
                ₦{data && data.totalBorrowedFunds ? formatAmount(data.totalBorrowedFunds): "0"}
              </p>
              <p className="font-bold text-xs text-[#FF3B30]">pending Payments</p>
            </div>
          </div>
        </div>
      </div>
      <div className={"bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[700px] "}>
        <h3 className="capitalize font-bold text-3xl  text-darkbackground ">
          Recent Transactions
        </h3>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-medium ">
          Latest wallet funding and debit activities
        </p>
        <div className={" bg-[#FFFFFF] mt-10 border-2 border-[#AAAAAA] rounded-xl w-full overflow-auto max-h-[500px] min-h-[500px] h-[500px]"  + ((isLoading || isPending || isFetching || isRefetching) ? " shimmer" : "")}>
          <table className={" min-w-[700px] w-full table-fixed border-collapse max-h-[200px] min-h-[200px] h-[200px]" + ((isLoading || isPending || isFetching || isRefetching) ? " hidden" : "")}>
            <thead className=" text-start sticky top-0 bg-white z-10">
              <tr className="border-b border-zinc-200 text-center">
                <th
                  scope="col"
                  className="px-4 py-3 text-xl font-medium"
                >
                  User
                </th>
                <th scope="col" className="px-4 py-3 text-xl font-medium">
                  Type
                </th>
                <th scope="col" className="px-4 py-3 text-xl font-medium">
                  Amount
                </th>
                <th scope="col" className="px-4 py-3 text-xl font-medium">
                  Method
                </th>
                <th scope="col" className="px-4 py-3 text-xl font-medium">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-xl font-medium">
                  Date & Time
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200 text-center max-h-[200px] min-h-[200px] h-[200px]">
              {data?.recentTransactions && data?.recentTransactions.length > 0 ? (
                data?.recentTransactions?.map((r, idx) => (
                  <tr key={idx} className=" divide-zinc-200">
                    <td className="px-4 py-4 text-lg font-medium text-center   capitalize text-[#163145] truncate">
                      {r.userName}
                      {/* <p className="text-sm text-[#7D7979] lowercase">
                        davidmuoegbunam@gmail.com
                      </p> */}
                    </td>
                    <td className={"Capitalize" + (r.type === "Credit" ? " text-[#34C759]" : " text-[#FF3B30]")}>{r.type}</td>
                    <td className={"px-4 py-4 text-lg truncate" + (r.type === "Credit"? " text-[#34C759]" : " text-[#FF3B30]")}>₦{r.amount.toFixed(2)}</td>
                    <td className="text-center truncate">{r.method}</td>
                    <td className="px-4 py-4 text-lg truncate">
                      <p
                        className={
                          " text-lg rounded-full max-w-40 text-center mx-auto py-1 text-white" +
                          (r.status === "SUCCESS"
                            ? " bg-[#1526DD]"
                            : " bg-[#FF3B30]")
                        }
                      >
                        {r.status === "SUCCESS" ? "Completed" : "Failed"}
                      </p>
                    </td>
                    <td className="">
                      {new Date(r.date).toDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={"px-4 py-10 text-center text-sm"  + ((isLoading || isPending || isFetching || isRefetching) ? " hidden" : "")}>
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
}

// export default Admindasboard;
