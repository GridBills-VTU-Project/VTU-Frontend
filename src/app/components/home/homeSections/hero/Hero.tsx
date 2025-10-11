// import p from "../../../../../../public/person.png";
// import p2 from "../../../../../../public/person2.png";
// import ph from "../../../../../../public/fluent_phone-24-regular.png";
import { sidebarLinks } from "@/app/constants/sidebarConstants";
import p3 from "../../../../../../public/person3.png";
import mtn from "../../../../../../public/mtn.jpg";
import mobile from "../../../../../../public/9mobile.jpg";
import airtel from "../../../../../../public/airtel.jpg";
import jamb from "../../../../../../public/jamb.png";
import neco from "../../../../../../public/neco.png";
import waec from "../../../../../../public/waec.png";
import Image from "next/image";
import React from "react";
import "./hero.css";

const Hero = () => {
  return (
    <div className="w-full mb-30 p-10 pb flex gap-10 bg-linear-to-b from-[#FFFFFF] via-[#8DEAFF] to-[#1489e3c4] h-[550px] not-lg:flex-col not-lg:h-[800px] not-sm:h-[800px] not-lg:gap-10 lg:justify-between mobile:ml-[150px] ">
      <div className="not-mobile:max-w-[70%] max-w-[50%] xl:max-w-[30%] not-sm:max-w-full">
        <h1 className="text-[2.75rem] font-black text-start text-[#163145] not-lg:text-4xl leading-15 not-sm:text-2xl">
          Bill Payments Made Seamless
        </h1>
        <p className="mt-2 font-bold text-xl text-[#727272]">
          A reliable and highly secure platform for smooth recharge and bill
          payments
        </p>
        <div className="mt-6 flex gap-4 flex-wrap">
          {sidebarLinks.map((link) => (
            <Image
              key={link.name}
              className={"rounded-2xl p-2 " + link.color}
              src={link.img}
              width={30}
              height={30}
              alt={`${link.name} icon`}
            />
          ))}
        </div>
      </div>
      <section className="relative flex justify-center items-center h-[450px]">
        <div className="relative w-[400px] h-full flex justify-center items-center">
          {/* Decorative Stars */}
          <div className="absolute star top-[2%] left-0" />
          <div className="absolute star top-[10%] right-0" />
          <div className="absolute star bottom-[10%] left-0" />
          <div className="absolute star bottom-[10%] right-0" />
        {/* Circular orbit */}
          <div className="relative inset-0 rounded-full border-2 border-[#ffffff6b] animate-spin-slow overflow-hidden w-full h-full">
            {/* Central Image */}
            <Image
              src={p3} // <-- replace with your actual image path
              alt="User smiling at phone"
              width={1250}
              height={1000}
              priority={true}
              className="object-contain z-10 min-h-full absolute w-full"
            />
          </div>

          {/* Telecom logos positioned around circle */}
          <div className="absolute -top-[5%] left-1/2 -translate-x-1/2 z-40">
            <Image
              src={mtn}
              alt="MTN icon"
              width={40}
              height={60}
              className="rounded-full"
            />
          </div>

          <div className="absolute top-[20%] right-[5%] translate-x-1/2 z-40">
            <Image
              src={mobile}
              alt="9mobile icon"
              width={40}
              height={60}
              className="rounded-full"
            />
          </div>

          <div className="absolute bottom-[15%] right-[10%] translate-x-1/2 translate-y-1/2 z-40">
            <Image
              src={airtel}
              alt="airtel icon"
              width={40}
              height={60}
              className="rounded-full"
            />
          </div>

          <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40">
            <Image
              src={jamb}
              alt="jamb icon"
              width={40}
              height={60}
              className="rounded-full"
            />
          </div>

          <div className="absolute top-[20%] left-[4%] -translate-x-1/2 z-40">
            <Image
              src={neco}
              alt="neco icon"
              width={40}
              height={60}
              className="rounded-full"
            />
          </div>

          <div className="absolute bottom-[10%] left-[10%] -translate-x-1/2 z-40">
            <Image
              src={waec}
              alt="waec icon"
              width={40}
              height={60}
              className="rounded-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
