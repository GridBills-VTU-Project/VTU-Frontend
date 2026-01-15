import { formatAmount } from "@/app/util/functions";
import { Smartphone, StickyNote, Tv, Wifi, Zap } from "lucide-react";
import React from "react";

const icons = [
  <Wifi color="#646FC6" />,
  <Smartphone color="#646FC6" />,
  <Tv color="#646FC6" />,
  <Zap color="#646FC6" />,
  <StickyNote color="#646FC6" />,
];

const AdminVtuServicesCard = ({
  title,
  revenue,
  totalTransactions,
  profitMargin,
  loading,
}: {
  title: string;
  revenue: string;
  totalTransactions: string;
  profitMargin: string;
  loading: boolean;
}) => {
  // Function to select icon based on title
  const getIcon = (title: string) => {
    switch (
      title // Using toLowerCase for case-insensitive matching
    ) {
      case "data":
        return icons[0];
      case "airtime":
        return icons[1];
      case "airtimepin":
        return icons[1];
      case "wallet_fund":
        return icons[2];
      case "airtimepin":
        return icons[3];
      case "electricity":
        return icons[4];
      default:
        return icons[0]; // Default to Wifi if no match
    }
  };
  return (
    <div
      className={
        "max-w-[400px] w-full bg-[#FFFFFF] p-5 rounded-lg max-h-[400px] h-[400px] " +
        (loading && " shimmer")
      }
    >
      <div className={"w-full h-full " + (loading && " hidden")}>
        <div className="flex gap-5">
          <div className="bg-[#646FC64D] rounded-full w-fit h-fit p-5"> 
            {getIcon(title)} {/* Dynamically selected icon */}
          </div>
          <div className="flex flex-col justify-between gap-5">
            <h1 className="font-bold text-darkbackground text-xl w-full">
              {title}
            </h1>
            <p className="bg-blue text-white rounded-full px-3 py-1 w-fit text-sm">
              Active
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="font-bold text-xl w-full flex justify-between">
            <p className="text-textlight font-medium">
              Today&apos;s Transactions
            </p>
            <p>{totalTransactions}</p>
          </div>
          <div className="font-bold text-xl w-full flex justify-between">
            <p className="text-textlight font-medium flex-2">
              Today&apos;s Revenue
            </p>
            <p className="text-green flex-1 text-end truncate">
              ₦{formatAmount(revenue)}
            </p>
          </div>
        </div>
        <div className="border-textlight border-2 my-5"></div>
        <h2 className="font-bold text-darkbackground text-xl w-full mb-1">
          Profit Margin
        </h2>
        <div className="flex items-center gap-5">
          <input
            disabled={true}
            name="first_name"
            value={profitMargin}
            onChange={(e) => {}}
            readOnly
            type="text"
            className={
              " outline-darkbackground border-2 border-[#7575754D] p-4 rounded-2xl bg-[#8080801A] flex-2"
            }
            placeholder="profit margin"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminVtuServicesCard;
