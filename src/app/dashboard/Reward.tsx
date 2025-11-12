'use client'
import { transactions } from '@/app/constants/sidebarConstants';
import UseAxios from '@/app/customHooks/UseAxios';
import { getDashboard } from '@/app/lib/Api';
import { useQuery } from '@tanstack/react-query';
import { Wallet} from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const Reward = () => {
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
          Rewards & Points
        </h1>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold ">
          Earn points with every transaction
        </p>
      </div>
      <div className={'h-[250px] max-xs:h-[300px] p-5 w-full rounded-xl ' + (isLoading && " shimmer")}>

      <div className={"flex mt-6 flex-col gap-5 bg-linear-to-r from-[#646FC6] to-[#B784DB] h-full p-5 w-full rounded-xl text-[#FFFFFF] " + ( isLoading && " hidden")}>
        <span className="bg-[#F9FBFF4D] p-1 rounded-lg w-fit ml-auto ">
          <Wallet />
        </span>
        <div className="flex flex-col gap-5 ">
          <p className="font-medium text-sm">Your Points</p>
          <h2 className="flex justify-between font-bold text-4xl leading-6 capitalize">
            {data?.data.rewardPoints|| "0"}
          </h2>
          <p className='capitalize bg-[#B3F6AD66] px-5 py-2 w-fit rounded-4xl font-semibold text-xs'>silver member</p>
        </div>
      </div>
      </div>
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[800px]">
        <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
          Points History
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
}

export default Reward