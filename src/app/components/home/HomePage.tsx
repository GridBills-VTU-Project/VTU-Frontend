import Image from "next/image";
import React from "react";
import { sidebarLinks } from "@/app/constants/sidebarConstants";
import Hero from "./homeSections/hero/Hero";
// import Download from "./homeSections/download/Download";

const HomePage = () => {
  return (
    <>
      <div className="flex w-full min-h-full">
        <div
          className={
            "fixed flex items-center flex-col bg-darkbackground h-full w-[20%] max-w-[150px] duration-500 not-mobile:hidden"
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
        <Hero />
      </div>
        {/* <Download /> */}
    </>
  );
};

export default HomePage;
