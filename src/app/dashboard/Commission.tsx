"use client";
import React, { useEffect } from "react";
import UseRole from "../customHooks/UseRole";
import { useCommission } from "../customHooks/UseQueries";
import { RefreshCcw, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

const Commission = () => {
  const canView = UseRole(["agent"]);
  const router = useRouter();
  const { data, isLoading, isError ,refetch,isPending,isFetching} = useCommission();
  useEffect(() => {
    if (!canView) router.back();
  }, []);
  const mockData = [
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
    {
      id: 7,
      type: "airtime",
      user_Id: "10000251",
      assigned_Date: "2025-08-13T15:06:33.593",
      custum_3: "₦8,500",
      custum_4: "paid",
      token_Type: "S",
    },
  ];
  return (
    <div>
      {canView && (
        <div>
          <div className="w-full">
            <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl">
              Commission Overview
              <button className="ml-3" onClick={()=>refetch()}>
            <RefreshCcw />
          </button>
            </h1>
            <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold mt-4">
              Welcome back! Here is what is happening in your Account
            </p>
          </div>
          <div className="flex w-full gap-4 mt-6 flex-wrap max-lg:justify-center justify-between">
            <div
              className={
                " gap-9 bg-linear-to-b from-[#1122AE]/60 to-[#D345A4]/60 h-[200px] p-5 w-full max-w-[375px] rounded-xl text-[#FFFFFF] flex flex-col justify-between" +
                (isLoading || isPending || isFetching ? " shimmer" : " ")
              }
            >
              <div
                className={
                  "h-[60%] flex flex-col justify-between" +
                  (isLoading || isPending || isFetching ? " hidden" : " ")
                }
              >
                <h2 className="flex justify-between text-lg font-medium leading-6 capitalize">
                  Total Commission Earned
                  <span className="bg-[#646FC6] p-1 rounded-lg">
                    {" "}
                    <TrendingUp />
                    
                  </span>
                </h2>
                <div>
                  <p className="font-bold text-2xl">
                    ₦{!isError && data?.availableBalance}
                  </p>
                </div>
              </div>
            </div>
            <div
              className={
                "gap-9 bg-linear-to-b from-[#1122AE]/60 to-[#D345A4]/60 h-[200px] p-5 w-full max-w-[375px] rounded-xl text-[#FFFFFF] flex flex-col justify-between" +
                (isLoading || isPending || isFetching ? " shimmer" : " ")
              }
            >
              <div
                className={
                  "h-[60%] flex flex-col justify-between" +
                  (isLoading || isPending || isFetching ? " hidden" : " ")
                }
              >
                <h2 className="flex justify-between text-lg font-medium leading-6 capitalize">
                  Available for Withdrawal
                  <span className="bg-[#646FC6] p-1 rounded-lg">
                    {" "}
                    <Wallet />
                  </span>
                </h2>
                <div className="mt-3">
                  <p className="font-bold text-2xl ">
                    ₦{!isError && data?.availableBalance}
                  </p>
                </div>
              </div>
            </div>
            <div
              className={
                "gap-9 bg-linear-to-b from-[#1122AE]/60 to-[#D345A4]/60 h-[200px] p-5 w-full max-w-[375px] rounded-xl text-[#FFFFFF] flex flex-col justify-between" +
                (isLoading || isPending || isFetching ? " shimmer" : " ")
              }
            >
              <div
                className={
                  "h-[60%] flex flex-col justify-between" +
                  (isLoading || isPending || isFetching ? " hidden" : " ")
                }
              >
                <h2 className="flex justify-between text-lg font-medium leading-6 capitalize">
                  Commission Rate
                  <span className="bg-[#646FC6] p-1 rounded-lg">
                    {" "}
                    <TrendingUp />
                  </span>
                </h2>
                <div>
                  <p className="font-bold text-2xl ">
                    {!isError && data?.data?.rewardPoints}%
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              " mt-6 rounded-xl w-full" + (isLoading || isPending || isFetching? " h-[230px] shimmer" : " ")
            }
          >
            <div
              className={
                "flex flex-col justify-end gap-5 bg-linear-to-r from-[#646FC6] to-[#646FC6] h-full p-5  w-full rounded-xl text-[#FFFFFF] " +
                (isLoading || isPending || isFetching && " hidden")
              }
            >
              <p className=" w-fit">Withdraw Commission</p>
              <div className="">
                <h2 className="flex justify-between font-bold text-3xl leading-6 capitalize truncate">
                  ₦{isError? 0: data?.availableBalance}
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
          {/* <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10">
            <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
              Tv Subscription
            </h3>
            <div className="flex flex-col gap-10 mt-15">
              <div className="flex justify-between items-center p-5 rounded-lg gap-3 bg-[#AAAAAA33] h-fit">
                <div>
                  <h3 className="font-semibold text-xl text-[#000000]">
                    Airtime Sales
                  </h3>
                  <p className="text-[#757575] text-sm">2% commission rate</p>
                </div>
                <p className="text-[#18E54C] font-extrabold text-2xl">₦8,500</p>
              </div>
              <div className="flex justify-between items-center p-5 rounded-lg gap-3 bg-[#AAAAAA33] h-fit">
                <div>
                  <h3 className="font-semibold text-xl text-[#000000]">
                    Airtime Sales
                  </h3>
                  <p className="text-[#757575] text-sm">2% commission rate</p>
                </div>
                <p className="text-[#18E54C] font-extrabold text-2xl">₦8,500</p>
              </div>
              <div className="flex justify-between items-center p-5 rounded-lg gap-3 bg-[#AAAAAA33] h-fit">
                <div>
                  <h3 className="font-semibold text-xl text-[#000000]">
                    Airtime Sales
                  </h3>
                  <p className="text-[#757575] text-sm">2% commission rate</p>
                </div>
                <p className="text-[#18E54C] font-extrabold text-2xl">₦8,500</p>
              </div>
            </div>
          </div> */}
          <div className=" bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10 w-full overflow-auto max-h-[500px] min-h-[500px] h-[500px]">
            <h3 className="capitalize font-bold text-3xl text-[#163145] mb-10 w-full">
             Commission History
            </h3>
            <table className=" min-w-[600px] w-full table-fixed border-collapse max-h-[200px] min-h-[200px] h-[200px]">
              <thead className=" text-center">  
                <tr className="border-b border-zinc-200 text-center">
                  <th scope="col" className="px-4 py-3 text-sm font-medium">
                    Commission ID
                  </th>
                  <th scope="col" className="px-4 py-3 text-sm font-medium">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 text-sm font-medium">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3 text-sm font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-sm font-medium">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-200 text-center max-h-[200px] min-h-[200px] h-[200px]">
                {mockData && mockData.length > 0 ? (
                  mockData?.map((r, idx) => (
                    <tr key={idx} className="divide-x divide-zinc-200">
                      <td className="px-4 py-4 text-sm font-medium">
                        {r.user_Id}
                      </td>
                      <td className="px-4 py-4 text-sm">{r.type}</td>
                      <td className="px-4 py-4 text-sm">
                        {r.custum_3}
                      </td>
                      <td className="text-center">
                        <p className=" text-sm bg-[#52D2EF] rounded-full max-w-fit mx-auto px-5 py-2">

                        {r.custum_4}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold mx-auto">
                        {/* <button
                          className="mx-auto hover:cursor-pointer bg-[#FFCC33] text-[#090540] hover:text-[#FFCC33] rounded-md p-2 w-24 hover:bg-[#090540]"
                          onClick={() => {
                            //   retry(r)
                          }}
                        >
                          Retry Debit
                        </button> */}
                        <p>
                            {new Date(r.assigned_Date).toDateString()}
                        </p>
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
      )}
    </div>
  );
};

export default Commission;
