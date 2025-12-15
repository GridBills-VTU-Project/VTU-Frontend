'use client'
import { transactions } from '@/app/constants/sidebarConstants';
import { RefreshCcw, TrendingDown, TrendingUp, Wallet} from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { useReward } from '../../customHooks/UseQueries';

const Users = () => {

  const { data, isLoading, isError,refetch } = useReward();
  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
          User Management
          <button className="ml-3" onClick={()=>refetch()}>
            <RefreshCcw />
          </button>
        </h1>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold ">
          View and manage all platform users
        </p>
      </div>
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[800px]">
        <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
         All Users
        </h3>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold ">
          Search, filter and manage user accounts
        </p>
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

export default Users