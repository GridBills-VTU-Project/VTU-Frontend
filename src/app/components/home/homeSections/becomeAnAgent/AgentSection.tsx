import Image from "next/image";
import React from "react";
import p3 from "../../../../../../public/secondPerson.png";
import { AgentCard } from "../partners_and_services/Card";
import { agentCards } from "@/app/constants/cardConstants";
import Link from "next/link";

const AgentSection = () => {
  return (
    <section className=" mx-auto bg-lightbackground py-25">
      <div className="w-[80%] mx-auto flex flex-col justify-between mb-25">
        <div className="text-center not-mobile:w-full relative w-[80%] mx-auto">
          <h2 className=" text-4xl font-black text-[#163145] not-xl:text-2xl leading-6 mb-7">
            Become an Agent
            <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[60%] mt-2"></div>
            <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[65%] mt-5 max-xs:mt-4"></div>
          </h2>
          <p className="text-xl font-bold text-[#727272] mb-3">
            Join a thriving network of forward-thinking entrepreneurs partnering
            with GridBills.com. Deliver our seamless payment experience to your
            community and earn commissions on every transaction you process for
            your customers
          </p>
        </div>
        <div className="w-full flex justify-center items-center mt-5 mb-15">
          <div className="relative h-fit w-[250px] ">
            {/* Decorative Stars */}
            <div className="absolute star top-[2%] left-0" />
            <div className="absolute star top-[10%] right-0" />
            <div className="absolute star bottom-[10%] left-0" />
            <div className="absolute star bottom-[10%] right-0" />
            {/* Circular orbit */}
            <div className="relative inset-0 rounded-t-full rounded-b-full border-2 border-[#646FC6] w-[250px] h-[400px] overflow-hidden flex justify-center">
              {/* Central Image */}
              <Image
                src={p3} // <-- replace with your actual image path
                alt="User smiling at phone"
                width={1250}
                height={1000}
                loading="lazy"
                className="object-cover absolute h-90 w-full top-10"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-10 flex-wrap justify-center">
          {agentCards.map((item, index) => (
            <AgentCard key={index} {...item} />
          ))}
        </div>
        <div className="mt-20 w-full justify-center flex gap-4 max-sm:text-sm">
          <Link href={"/dashboard?tab=dashboard"} className="text-center bg-[#646FC6] py-5 w-50 hover:cursor-pointer hover:bg-[#646FC6]/90 rounded-xl text-[#ffffff] font-medium">
            Start Now
          </Link>
          <Link href={"/agent"} className="text-center border border-[#163145] text-[#163145] py-5 w-50 hover:cursor-pointer hover:bg-[#646FC6]/40 hover:text-[#ffff] rounded-xl font-medium">
            Discover More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AgentSection;
