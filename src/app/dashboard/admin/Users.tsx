"use client";
import { RefreshCcw, Search } from "lucide-react";
import React from "react";
import { useReward } from "../../customHooks/UseQueries";
import { mockData } from "@/app/constants/constant";

const Users = () => {
  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
          User Management
          <button className="ml-3">
            <RefreshCcw />
          </button>
        </h1>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold ">
          View and manage all platform users
        </p>
      </div>
      <div className="bg-[#FFFFFF] mt-10 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[800px]">
        <h3 className="capitalize font-bold text-3xl  text-darkbackground mb-2">
          All Users
        </h3>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold mb-10 ">
          Search, filter and manage user accounts
        </p>
        {/* <div className="flex my-5">
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
        </div> */}
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
          <button className="flex bg-[#8080801A] px-10 p-4 gap-1 border-2 border-[#7575754D] rounded-lg">
            {/* <Copy size={20} /> */}
            Filter
          </button>
        </div>
        <div className=" bg-[#FFFFFF] mt-10 border-2 border-[#AAAAAA] rounded-xl w-full overflow-auto max-h-[500px] min-h-[500px] h-[500px]">
          {/* <h3 className="capitalize font-bold text-3xl text-[#163145] mb-10 w-full">
             Commission History
            </h3> */}
          <table className=" min-w-[700px] max-w-[3000px] w-full table-fixed border-collapse max-h-[200px] min-h-[200px] h-[200px]">
            <thead className=" text-start sticky top-0 bg-white z-10">
              <tr className="border-b border-zinc-200 text-center">
                <th
                  scope="col"
                  className="px-4 py-3 text-2xl font-medium text-start"
                >
                  User
                </th>
                <th scope="col" className="px-4 py-3 text-2xl font-medium">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-2xl font-medium">
                  Wallet Balance
                </th>
                <th scope="col" className="px-4 py-3 text-2xl font-medium">
                  Total Transactions
                </th>
                <th scope="col" className="px-4 py-3 text-2xl font-medium">
                  Actions
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
                    <td className="px-4 py-4 text-lg">
                      <p
                        className={
                          " text-lg rounded-full max-w-40 text-center mx-auto py-1 text-white" +
                          (r.custum_4 === "Active"
                            ? " bg-[#1526DD]"
                            : " bg-[#FF3B30]")
                        }
                      >
                        {r.custum_4}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-lg">{r.custum_3}</td>
                    <td className="text-center">{r.custum_3}</td>
                    <td className="">
                      <button
                        className={
                          "px-4 py-1 font-semibold text-lg rounded-lg w-40 text-center mx-auto text-white " +
                          (r.custum_4 != "Active"
                            ? " bg-[#1526DD] hover:!bg-[#1526dd]/90"
                            : " bg-[#FF3B30] hover:bg-[#ff3b30]/90")
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

export default Users;
