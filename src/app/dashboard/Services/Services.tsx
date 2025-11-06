import { quickActions } from "@/app/constants/sidebarConstants";
import Image from "next/image";
import React from "react";
import AirtimeForm from "./AirtimeForm";
import DataForm from "./DataForm";
import ElectricBillForm from "./ElectricBillForm";
import ExamCardForm from "./ExamCardForm";
import SubscriptionForm from "./SubscriptionForm";

const Services = ({
  section,
  setSection,
}: {
  section: string | null;
  setSection: (text: string) => void;
}) => {
  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl">
          Dashboard Overview
        </h1>
        <p className="text-[#7D7979] text-lg font-bold mt-4">
          Welcome back! Here is what is happening in your Account
        </p>
      </div>
      <div className="flex gap-4 mt-10 flex-wrap max-xs:justify-center justify-between">
        {quickActions.map((action, index) => (
          <button
            onClick={() => setSection(action.query)}
            key={index}
            className={
              " w-full max-w-[200px] h-[120px] rounded-xl flex flex-col items-center justify-center gap-4 border-2 border-[#0000001A]" +
              (section && action.query === section
                ? " bg-[#646FC6] hover:bg-[#646FC6]/90 text-white"
                : " text-[#215D67] hover:bg-[#646FC6]/20")
            }
          >
            <Image
              className=""
              src={action.img}
              width={20}
              height={20}
              alt={`${action.name} icon`}
            />
            <h4 className="font-semibold text-xs">{action.name}</h4>
          </button>
        ))}
      </div>
      <div className="">
        {section === "airtime" && <AirtimeForm />}
        {section === "data" && <DataForm />}
        {section === "bill" && <ElectricBillForm />}
        {section === "card" && <ExamCardForm />}
        {section === "subscription" && <SubscriptionForm />}
      </div>
    </div>
  );
};

export default Services;
