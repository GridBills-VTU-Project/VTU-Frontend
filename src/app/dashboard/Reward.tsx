'use client'
import { transactions } from '@/app/constants/sidebarConstants';
import { RefreshCcw, TrendingDown, TrendingUp, Wallet} from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { useReward } from '../customHooks/UseQueries';

const Reward = () => {

  const { data, isLoading, isError,refetch } = useReward();
  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
          Reward Overview
          <button className="ml-3" onClick={()=>refetch()}>
            <RefreshCcw />
          </button>
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
            {data?.rewardPoints|| "0"}
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
          {data?.rewardTransaction &&
          data?.rewardTransaction.length > 0 ? (
            <ul
              className={
                "h-full w-full flex flex-col gap-10  " + (isLoading && " hidden")
              }
            >
              {data.rewardTransaction.map((trans:any, index:number) => (
                <li
                  key={index}
                  className="bg-[#AAAAAA33] flex p-5 justify-between rounded-xl text-end items-center"
                >
                  <div className="flex gap-5 items-center max-w-[60%]">
                    {trans.type == "Credited" ?
                    <div className="p-3 bg-[#10AA3E1A] rounded-full">
                      <TrendingUp color="#10AA3E"/>
                    </div>
                    :
                    <div className="p-3 bg-[#FF00001A] rounded-full">
                      <TrendingDown color="#FF0000"/>
                    </div>
                    }
                    <div className="flex-2 truncate">
                      <h4 className="capitalize font-medium text-sm truncate ">
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