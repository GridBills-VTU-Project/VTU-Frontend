import Image from "next/image";
import React from "react";
import { sidebarLinks } from "@/app/constants/sidebarConstants";
import Hero from "./homeSections/hero/Hero";
import Download from "./homeSections/download/Download";
import Partners from "./homeSections/partners_and_services/Partners";
import AgentSection from "./homeSections/becomeAnAgent/AgentSection";

const HomePage = () => {
  return ( 
    <section className="flex max-mobile:block">
      <div className="flex justify-center w-full max-w-[150px] min-h-full bg-darkbackground">
        <div
          className={
            "flex items-center flex-col h-fit duration-500 not-mobile:hidden"
          }
        >
          <ul className="text-white font-medium text-xs leading-[22px] mt-10 flex flex-col gap-15">
            {sidebarLinks.map((link) => (
              <li
                key={link.name}
                className="text-center flex flex-col items-center"
              >
                <Image
                  className="bg-white rounded-2xl p-2"
                  src={link.img}
                  width={35}
                  height={20}
                  alt={`${link.name} icon`}
                />
                {link.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Hero />
        <Download />
        <Partners />
        <AgentSection />
      </div>
    </section>
  );
};

export default HomePage;
