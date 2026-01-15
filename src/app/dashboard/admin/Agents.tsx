"use client";
import { Copy, RefreshCcw, X } from "lucide-react";
import React, { useState } from "react";
import {
  useGetAgentOverview,
  useGetAgentSummary,
} from "../../customHooks/UseQueries";
import { formatAmount, handleCopy } from "@/app/util/functions";
import { useApproveAgentMutation } from "@/app/customHooks/useMutation";
import { Agent } from "@/app/util/types";
import Pagination from "@/app/components/pagination/Pagination";
import useDebounce from "@/app/customHooks/UseDebounce";

export default function Agents() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const userName = useDebounce<string>(search, 500);
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
    isPending,
    isRefetching,
  } = useGetAgentOverview({ pageNumber: page, pageSize: 10, search: userName });
  const {
    data: agentSummary,
    isLoading: agentSummaryIsLoading,
    isError: agentSummaryIsError,
    refetch: agentSummaryRefetch,
    isFetching: agentSummaryIsFetching,
    isPending: agentSummaryIsPending,
    isRefetching: agentSummaryIsRefetching,
  } = useGetAgentSummary();
  const [approve, setApprove] = useState<{
    approve: Boolean;
    agent: null | Agent;
  }>({ approve: true, agent: null });
  const { mutateAsync, isPending: isApproving } = useApproveAgentMutation();

  const handleApproveAgent = async (agentId: string) => {
    try {
      await mutateAsync({ agentId });
    } catch (error) {
      console.error("Error approving agent:", error);
    }
  };
  return (
    <>
      <div className="w-full">
        {/* header message */}
        <div className="w-full">
          <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
            Agent Management
            <button className="ml-3" onClick={() => agentSummaryRefetch()}>
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
              (agentSummaryIsLoading ||
              agentSummaryIsPending ||
              agentSummaryIsFetching
                ? " shimmer"
                : " ")
            }
          >
            <div
              className={
                "h-full flex flex-col justify-around flex-9 " +
                (agentSummaryIsLoading ||
                agentSummaryIsPending ||
                agentSummaryIsFetching
                  ? " hidden"
                  : " ")
              }
            >
              <h2 className="flex justify-between text-lg font-medium leading-6 capitalize text-[#808080]">
                Total Agents{" "}
              </h2>
              <div>
                <p className="font-bold text-2xl text-[#1DC81D]">
                  {agentSummary && agentSummary.totalAgents
                    ? agentSummary.totalAgents
                    : "0"}
                </p>
                {/* <p className="font-bold text-xs text-[#808080]">Across all users</p> */}
              </div>
            </div>
          </div>
          <div
            className={
              " gap-9 bg-[#FFFFFF] h-[200px] p-5 w-full max-w-[400px] shadow-sm shadow-[#00000040] rounded-xl flex justify-between border-2 border-[#AAAAAA33] " +
              (agentSummaryIsLoading ||
              agentSummaryIsPending ||
              agentSummaryIsFetching
                ? " shimmer"
                : " ")
            }
          >
            <div
              className={
                "h-full flex flex-col justify-around flex-9 " +
                (agentSummaryIsLoading ||
                agentSummaryIsPending ||
                agentSummaryIsFetching
                  ? " hidden"
                  : " ")
              }
            >
              <h2 className="flex justify-between text-lg font-medium leading-6 capitalize text-[#808080]">
                Pending Agent Approval{" "}
              </h2>
              <div>
                <p className="font-bold text-2xl text-[#1526DD]">
                  {agentSummary && agentSummary.approvedAgents
                    ? agentSummary.approvedAgents
                    : "0"}
                </p>
                {/* <p className="font-bold text-xs text-[#808080]">Current</p> */}
              </div>
            </div>
          </div>
          <div
            className={
              " gap-9 bg-[#FFFFFF] h-[200px] p-5 w-full max-w-[400px] shadow-sm shadow-[#00000040] rounded-xl flex justify-between border-2 border-[#AAAAAA33] " +
              (agentSummaryIsLoading ||
              agentSummaryIsPending ||
              agentSummaryIsFetching
                ? " shimmer"
                : " ")
            }
          >
            <div
              className={
                "h-full flex flex-col justify-around flex-9 " +
                (agentSummaryIsLoading ||
                agentSummaryIsPending ||
                agentSummaryIsFetching
                  ? " hidden"
                  : " ")
              }
            >
              <h2 className="flex justify-between text-lg font-medium leading-6 capitalize text-[#808080]">
                Pending Withdrawals{" "}
              </h2>
              <div>
                <p className="font-bold text-2xl text-[#FF3B30]">
                  ₦
                  {agentSummary && agentSummary.pendingWithdrawals
                    ? formatAmount(agentSummary.pendingWithdrawals)
                    : "0.0"}
                </p>
                {/* <p className="font-bold text-xs text-[#808080]">Current</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[800px]">
          <h3 className="capitalize font-bold text-3xl  text-darkbackground ">
            All Agents
            <button className="ml-3" onClick={() => refetch()}>
              <RefreshCcw />
            </button>
          </h3>
          <p className="text-[#7D7979] text-lg font-medium mb-10">
            Search, filter and manage agent accounts
          </p>
          {/* search */}
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

          {/* main table */}
          <div
            className={
              " bg-[#FFFFFF] mt-10 border-2 border-[#AAAAAA] rounded-xl overflow-auto max-h-[500px] h-full relative min-w-[800px] " +
              (isLoading || isPending || isFetching || isRefetching
                ? " shimmer"
                : "")
            }
          >
            <table
              className={
                " min-w-[1200px] w-full table-fixed border-separate border-spacing-x-4 border-spacing-y-2 " +
                (isLoading || isPending || isFetching || isRefetching
                  ? " hidden"
                  : "")
              }
            >
              <thead className=" text-start sticky top-0 bg-white z-10">
                <tr className="border-b border-zinc-200 text-center">
                  <th
                    scope="col"
                    className="px-4 py-3 text-lg font-medium text-start"
                  >
                    Agent
                  </th>
                  <th scope="col" className="px-4 py-3 text-lg font-medium">
                    Commission Rate
                  </th>
                  <th scope="col" className="px-4 py-3 text-lg font-medium">
                    Total Sales
                  </th>
                  <th scope="col" className="px-4 py-3 text-lg font-medium">
                    Agent Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-lg font-medium">
                    Agent Action
                  </th>
                  <th scope="col" className="px-4 py-3 text-lg font-medium">
                    Pending Payout
                  </th>
                  <th scope="col" className="px-4 py-3 text-lg font-medium">
                    Payment Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-lg font-medium">
                    Approve Payment
                  </th>
                  <th scope="col" className="px-4 py-3 text-lg font-medium">
                    View Acc.
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-200 text-center ">
                {data?.data && data?.data.length > 0 ? (
                  data?.data?.map((r, idx) => (
                    <tr key={idx} className=" divide-zinc-200">
                      <td className="px-4 py-4 text-lg font-medium text-start capitalize text-[#163145] truncate">
                        {r.agentId}
                        <p className="text-sm text-[#7D7979] lowercase">
                          {r.email}
                        </p>
                      </td>
                      <td className="">{r.commissionRate}</td>
                      <td className="px-4 py-4 text-lg truncate">
                        {r.totalSales}
                      </td>
                      <td className=" py-4 text-lg truncate">
                        <p
                          className={
                            " text-lg rounded-full max-w-40 text-center mx-auto py-1 text-white" +
                            (r.isAgentApproved
                              ? " bg-[#1526DD]"
                              : " bg-[#FF3B30]")
                          }
                        >
                          {r.isAgentApproved ? "Approved" : "Not Approved"}
                        </p>
                      </td>
                      <td className="">
                        <button
                          onClick={() => {
                            if (r.isAgentApproved) {
                              return;
                            }
                            handleApproveAgent(r.agentId);
                          }}
                          className={
                            "px-4 py-1 font-semibold text-lg rounded-lg w-30 text-center mx-auto text-white relative" +
                            (r.isAgentApproved || isApproving
                              ? " bg-[#1526DD4D] "
                              : " bg-[#1526DD] hover:bg-[#1526DD]/90")
                          }
                        >
                          {/* {r.isAgentApproved ? "Reject" : "Approve"} */}
                          <div
                            className={
                              "flex justify-center max-w-fit " +
                              (!isApproving && " hidden")
                            }
                          >
                            <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin absolute left-[40%] top-[30%]"></div>
                          </div>
                          Approve
                        </button>
                      </td>
                      <td className="text-center truncate">
                        {r.pendingPayout}
                      </td>
                      <td className="text-center truncate">
                        {r.paymentStatus}
                      </td>
                      <td className="text-center truncate">
                        <button
                          disabled={r.isCommissionApproved == false}
                          onClick={() => {
                            setApprove({ approve: true, agent: r });
                          }}
                          className={
                            "px-2 py-1 font-semibold text-lg rounded-lg w-20 text-center mx-auto text-white " +
                            (r.isAgentApproved
                              ? " bg-[#FF3B30] hover:bg-[#FF3B30]/90 "
                              : " bg-[#1526DD] hover:bg-[#1526DD]/90")
                          }
                        >
                          {r.isCommissionApproved ? "Approve" : "Idle"}
                        </button>
                      </td>
                      <td className="">
                        <button
                          onClick={() => {
                            setApprove({ approve: true, agent: r });
                          }}
                          className={
                            "px-2 py-1 font-semibold text-lg rounded-lg w-20 text-center mx-auto text-white " +
                            (r.isAgentApproved
                              ? " bg-[#FF3B30] hover:bg-[#FF3B30]/90 "
                              : " bg-[#1526DD] hover:bg-[#1526DD]/90")
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className={
                        "px-4 py-10 text-center text-sm" +
                        (isLoading || isPending || isFetching || isRefetching
                          ? " hidden"
                          : "")
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
      {approve.approve && approve.agent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="flex flex-col w-fit py-5 px-10 justify-center items-center bg-neutral-100 rounded-lg shadow-2xl relative">
            <button
              onClick={() => setApprove({ approve: false, agent: null })}
              className="absolute top-2 right-2 bg-darkbackground p-1 rounded-sm text-white"
            >
              <X width={20} height={20} />
            </button>

            <div className="flex justify-between w-full gap-2 mb-2 mt-6">
              <h3 className="text-start text-xl font-semibold text-main-heading">
                Bank
              </h3>
              <div className="flex items-center gap-3">
                <p>{approve.agent?.bankName}</p>
                <button
                  type="button"
                  onClick={() =>
                    approve.agent && handleCopy(approve.agent.bankName)
                  }
                  className="px-3 py-1 border-2 rounded-lg border-primary text-primary font-light text-xs max-w-fit"
                >
                  <Copy strokeWidth={1} width={15} />
                </button>
              </div>
            </div>
            <div className="flex justify-between w-full gap-2 mb-2 mt-6">
              <h3 className="text-start text-xl font-semibold text-main-heading">
                Account Number
              </h3>
              <div className="flex items-center gap-3">
                <p>{approve.agent?.accountNumber}</p>
                <button
                  type="button"
                  onClick={() =>
                    approve.agent && handleCopy(approve.agent.accountNumber)
                  }
                  className="px-3 py-1 border-2 rounded-lg border-primary text-primary font-light text-xs max-w-fit"
                >
                  <Copy strokeWidth={1} width={15} />
                </button>
              </div>
            </div>

            <button
              onClick={() => setApprove({ approve: false, agent: null })}
              // disabled={!canCopy}
              className="bg-[#FF3B30] text-white py-2 px-4 rounded-xl"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// export default Admindasboard;
