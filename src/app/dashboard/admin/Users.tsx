"use client";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";
import { useGetAllUsers } from "@/app/customHooks/UseQueries";
import { useActivateOrSuspendUserMutation } from "@/app/customHooks/useMutation";
import Pagination from "@/app/components/pagination/Pagination";
import useDebounce from "@/app/customHooks/UseDebounce";

const Users = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const userName = useDebounce<string>(search, 500);
  console.log("djso", userName);

  const {
    data,
    isLoading,
    isError,
    refetch,
    isPending,
    isFetching,
    isRefetching,
  } = useGetAllUsers({ pageNumber: page, pageSize: 10, search: userName });
  const { mutateAsync, isPending: isApproving } =
    useActivateOrSuspendUserMutation();
  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
          User Management
          <button className="ml-3" onClick={() => refetch()}>
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
            disabled={isLoading}
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className={
              " outline-darkbackground border-2 border-[#7575754D] p-4 rounded-2xl bg-[#8080801A] flex-2"
            }
            placeholder="Search by name or email...."
          />
          <button className="flex bg-[#8080801A] px-10 p-4 gap-1 border-2 border-[#7575754D] rounded-lg">
            {/* <Copy size={20} /> */}
            Filter
          </button>
        </div>
        <div
          className={
            " bg-[#FFFFFF] mt-10 border-2 border-[#AAAAAA] rounded-xl w-full overflow-auto max-h-[500px] min-h-[500px] h-[500px] " +
            (isLoading || isPending || isFetching || isRefetching
              ? " shimmer"
              : "")
          }
        >
          {/* <h3 className="capitalize font-bold text-3xl text-[#163145] mb-10 w-full">
             Commission History
            </h3> */}
          <table
            className={
              " min-w-[700px] max-w-[3000px] w-full table-fixed border-collapse max-h-[200px] min-h-[200px] h-[200px]" +
              (isLoading || isPending || isFetching || isRefetching
                ? " hidden"
                : "")
            }
          >
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
              {data && data.data.length > 0 ? (
                data?.data.map((r, idx) => (
                  <tr key={idx} className=" divide-zinc-200">
                    <td className="px-4 py-4 text-lg font-medium text-start capitalize text-[#163145] truncate">
                      {r.userId}
                      <p className="text-sm text-[#7D7979] lowercase">
                        {r.email}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-lg">
                      <p
                        className={
                          " text-lg rounded-full max-w-40 text-center mx-auto py-1 text-white" +
                          (r.isActive ? " bg-[#1526DD]" : " bg-[#FF3B30]")
                        }
                      >
                        {r.isActive ? "Active" : "Inactive"}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-lg">{r.walletBalance}</td>
                    <td className="text-center">{r.totalTransactionValue}</td>
                    <td className="">
                      <button
                        onClick={() => {
                          mutateAsync({
                            isApproving: r.isActive ? "false" : "true",
                            userId: r.userId,
                          });
                        }}
                        className={
                          "px-4 py-1 font-semibold text-lg rounded-lg w-40 text-center mx-auto text-white " +
                          (r.isActive
                            ? " bg-[#FF3B30] hover:bg-[#ff3b30]/90"
                            : " bg-[#1526DD] hover:!bg-[#1526dd]/90")
                        }
                      >
                        {r.isActive ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className={
                      "px-4 py-10 text-center text-sm " +
                      (isLoading || isPending || isFetching || isRefetching)
                        ? " hidden"
                        : " "
                    }
                  >
                    {"No record found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {data && (
          <Pagination
            currentPage={data.pageNumber}
            totalPages={Math.ceil(data.totalRecords / 10)}
            onChange={(p) => setPage(p)}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
