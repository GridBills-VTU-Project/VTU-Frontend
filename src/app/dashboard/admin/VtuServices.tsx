"use client";
import { RefreshCcw } from "lucide-react";
import React from "react";
import {
  useGetAdminVtuServices,
} from "../../customHooks/UseQueries";
import AdminVtuServicesCard from "@/app/components/ui/AdminVtuServicesCard";
import { NormalLoadingScreen } from "@/app/loading";

export default function VtuServices() {
  const { data, isLoading, isError, refetch, isFetching, isPending } =
    useGetAdminVtuServices();

  return (
    <div className="w-full bg-[#F2F2F7]">
      {/* header message */}
      {/* {isLoading || isPending || isError || !data ? (
        <NormalLoadingScreen />
      ) : (
        <> */}
          <div className="w-full">
            <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
              VTU Services
              <button className="ml-3" onClick={()=>refetch()}>
                <RefreshCcw />
              </button>
            </h1>
            <p className="text-[#7D7979] text-lg font-bold mt-4">
              Manage service integrations and profit margins
            </p>
          </div>
          <div className="mt-20 flex flex-wrap gap-10 max-[1150]:justify-center">
            {data && data?.result.map((item) => (
              <AdminVtuServicesCard key={item.serviceType}
                title={item.serviceType}
                revenue={item.totalRevenue.toString()}
                totalTransactions={item.totalTransactions.toString()}
                profitMargin={item.averageProfitPercentage}
                loading={isLoading || isPending || isFetching}
              />
            ))}
          </div>
          {/* <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[800px] w-full">
            <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
              Service Performance
            </h3>
            <p className="text-[#7D7979] text-lg font-bold mt-1">
              Compare performance across all VTU services
            </p>
            <div
              className={
                "h-[90%] mt-10 overflow-auto flex justify-center items-center w-full " +
                (false && " shimmer")
              }
            >
              {true && true ? (
                <ul
                  className={
                    "h-full flex flex-col gap-10 w-full  " +
                    (false && " hidden")
                  }
                >
                  {mockData.map((trans: any, index: number) => (
                    <li
                      key={index}
                      className="bg-[#AAAAAA33] flex p-5 justify-between rounded-xl text-end items-center"
                    >
                      <div className="flex gap-5 items-center max-w-[60%]">
                        <div className="p-3 bg-[#FF00001A] rounded-full">
                          <TrendingDown color="#FF0000" />
                        </div>
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
                          <h5 className="font-medium text-sm text-green">
                            ₦{trans.user_Id}
                          </h5>
                          <p className="text-[#757575] text-sm">
                            {new Date(trans.createdAt).toDateString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={" " + (false && " hidden")}>
                  {" "}
                  No Recent transactions
                </p>
              )}
            </div>
          </div> */}
        {/* </>
      )} */}
    </div>
  );
}

// export default Admindasboard;
