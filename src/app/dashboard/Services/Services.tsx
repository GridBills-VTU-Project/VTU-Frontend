'use client'
import { quickActions } from "@/app/constants/sidebarConstants";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AirtimeForm from "./AirtimeForm";
import DataForm from "./DataForm";
import ElectricBillForm from "./ElectricBillForm";
import ExamCardForm from "./ExamCardForm";
import SubscriptionForm from "./SubscriptionForm";
import { useRouter, useSearchParams } from "next/navigation";
import CardPinForm from "./CardPinForm";

const Services = () => {
  const router = useRouter();  
  const [section, setSection] = useState<string>("airtime");
    const searchParams = useSearchParams();

  const setSectionTab = (newSection: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("section", newSection);
    router.push(`?${params.toString()}`, { scroll: false });
  };
    useEffect(()=>{
      const section = searchParams.get("section")
      if(!section){
        setSectionTab("airtime")
        setSection("airtime");
      }else{
        setSection(section)
      }
    },[searchParams])

  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl">
          Services
        </h1>
        <p className="text-[#7D7979] text-lg font-bold mt-4">
          Purchase airtime, data, and pay bills
        </p>
      </div>
      <div className="flex gap-4 mt-10 flex-wrap max-xs:justify-center justify-between">
        {quickActions.map((action, index) => (
          <button
            onClick={() => setSectionTab(action.query)}
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
        {section === "pin" && <CardPinForm />}
      </div>
    </div>
  );
};

export default Services;
