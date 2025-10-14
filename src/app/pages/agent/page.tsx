import Image from "next/image";
import React from "react";
import phone from "@/../public/agentphone.png";
import flower from "@/../public/agentflower.png";
import tab from "@/../public/agenttab.png";
import person from "@/../public/agentperson.png";
import person2 from "@/../public/profileperson.png";
const page = () => {
  return (
    <section className="bg-[#ffff] text-[#163145]">
      <h1 className="text-center max-xs:text-2xl text-4xl font-black not-xl:text-2xl leading-6 mb-7 relative py-18 px-18 max-sm:px-10">
        Become an Agent
        <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[55%] mt-1"></div>
        <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[60%] mt-4 max-xs:mt-3"></div>
      </h1>
      <div className="text-center bg-lightbackground">
        <h2 className="font-bold text-3xl p-10 max-xs:text-xl ">
          A New Door Just Opened…
        </h2>
        <p className="max-w-[50%] leading-6 mx-auto text-sm text-[#727272] pb-15 max-mobile:max-w-[80%] max-sm:text-xs">
          The Gridbills Agency Program is more than an offer it’s an invitation
          to grow with a platform built for the future of digital payments in
          Nigeria. We’re creating a space where everyday services like airtime,
          data, electricity, and TV subscriptions become opportunities for
          people like you to earn and expand. Join Gridbills today and become
          part of a system trusted by thousands, built on speed, simplicity, and
          reliability. Your network, your customers, your growth powered by
          Gridbills.
        </p>
      </div>
      <div className="bg-[#ffff] max-w-[80%] mx-auto mt-15 flex flex-col gap-20">
        <div className="flex justify-between items-center lg:h-[400px] max-lg:flex-col">
          <Image
            src={phone}
            width={1200}
            height={700}
            alt="a phone showing a successfull transaction"
            className="flex-1 object-contain h-full"
          />
          <div className="flex-1 h-full">
            <h3 className="font-bold text-2xl py-5 max-xs:text-xl">
              Why Gridbills?
            </h3>
            <p className=" leading-6 mx-auto text-sm text-[#727272] pb-5 max-sm:text-xs ">
              GridBills is committed to simplifying everyday payments and
              empowering communities through seamless digital solutions. We make
              it easy and convenient for you to pay for services you use daily
              from airtime and data to electricity, TV subscriptions, and more
              all in one place. <br />
              Trusted by thousands of users and agents across Nigeria, GridBills
              understands the power of technology in connecting people and
              creating value. Our platform is built to reward individuals who
              want to earn extra income or grow a business by leveraging a
              reliable and secure system. <br />
              At GridBills, we’re not just offering convenience; we’re building
              a community of smart earners and digital entrepreneurs. Join us
              today and be part of a growing brand that’s shaping the future of
              digital payments in Africa.
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center lg:h-[500px] max-lg:flex-col gap-5">
          <div className="flex-1 h-full">
            <h3 className="font-bold text-2xl py-5 max-xs:text-xl">
              Benefits Of Becoming Gridbills.com Agent
            </h3>
            <p className=" leading-6 mx-auto text-sm text-[#727272] pb-2 max-sm:text-xs ">
              Our Gridbills Agency Program is designed to empower you with
              exciting opportunities and benefits. When you become a Gridbills
              agent, you enjoy:
            </p>
            <ul className="text-[#000000] list-disc text-sm flex flex-col gap-4">
              <li>
                Attractive profits from selling Gridbills services as a verified
                terminal agent
              </li>
              <li>
                Instant commissions on every transaction you make or assist
                others to perform
              </li>
              <li>
                Reliable and stable platform that guarantees smooth operations
                at all times
              </li>
              <li>
                24/7 customer service via call, email, and live chat for your
                convenience
              </li>
              <li>
                Zero-capital startup options available for selected agency
                programs
              </li>
            </ul>
          </div>
          <Image
            src={flower}
            width={1200}
            height={700}
            alt="a person pointing at a flower with leaver as money signifying growth"
            className="flex-1 object-contain h-full max-lg:w-[400px]"
          />
        </div>
        <div className="flex justify-between items-center lg:h-[400px] max-lg:flex-col-reverse">
          <Image
            src={tab}
            width={1200}
            height={700}
            alt="a phone showing a successfull transaction"
            className="flex-1 object-contain h-full w-[400px]"
          />
          <div className="flex-1 h-full my-auto">
            <h3 className="font-bold text-2xl py-5 max-xs:text-xl">
              How to Get Started
            </h3>
            <p className=" leading-6 mx-auto text-sm text-[#727272] pb-5 max-sm:text-xs ">
              Ready to join the winning team? Get started today by creating your
              Gridbills account and activating the agency feature to unlock
              amazing opportunities. Becoming a Gridbills agent is quick and
              easy start earning and offering seamless bill payment services to
              your customers in no time.
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center max-lg:flex-col max-lg:gap-10 mb-10">
          <div className="flex-2 h-full my-auto">
            <h3 className="font-bold text-2xl py-5 max-xs:text-xl">
              Ways To Partner With Us
            </h3>
            <div className="grid xl:grid-cols-3 gap-4 font-medium max-xl:grid-cols-2 max-sm:grid-cols-1">
                <div className="border-2 border-[#808080]/20 p-5">
                        <div className="bg-[#646FC6]/20 rounded-full w-15 p-2 flex justify-center mb-3">
                          <Image
                            src={person2}
                            width={30}
                            height={30}
                            alt="just a normal icon"
                            className="rounded-full w-10"
                          />
                        </div>
                        <p className="leading-6 text-lg text-[#727272] pb-5 max-sm:text-sm ">Become a Gridbills,com Terminal Agent</p>
                </div>
                <div className="border-2 border-[#808080]/20 p-5">
                        <div className="bg-[#646FC6]/20 rounded-full w-15 p-2 flex justify-center mb-3">
                          <Image
                            src={person2}
                            width={30}
                            height={30}
                            alt="just a normal icon"
                            className="rounded-full w-10"
                          />
                        </div>
                        <p className="leading-6 text-lg text-[#727272] pb-5 max-sm:text-sm ">Become a Gridbills,com Terminal Agent</p>
                </div>
                <div className="border-2 border-[#808080]/20 p-5">
                        <div className="bg-[#646FC6]/20 rounded-full w-15 p-2 flex justify-center mb-3">
                          <Image
                            src={person2}
                            width={30}
                            height={30}
                            alt="just a normal icon"
                            className="rounded-full w-10"
                          />
                        </div>
                        <p className="leading-6 text-lg text-[#727272] pb-5 max-sm:text-sm ">Become a Gridbills,com Terminal Agent</p>
                </div>
                <div className="border-2 border-[#808080]/20 p-5">
                        <div className="bg-[#646FC6]/20 rounded-full w-15 p-2 flex justify-center mb-3">
                          <Image
                            src={person2}
                            width={30}
                            height={30}
                            alt="just a normal icon"
                            className="rounded-full w-10"
                          />
                        </div>
                        <p className="leading-6 text-lg text-[#727272] pb-5 max-sm:text-sm ">Become a Gridbills,com Terminal Agent</p>
                </div>
                <div className="border-2 border-[#808080]/20 p-5">
                        <div className="bg-[#646FC6]/20 rounded-full w-15 p-2 flex justify-center mb-3">
                          <Image
                            src={person2}
                            width={30}
                            height={30}
                            alt="just a normal icon"
                            className="rounded-full w-10"
                          />
                        </div>
                        <p className="leading-6 text-lg text-[#727272] pb-5 max-sm:text-sm ">Become a Gridbills,com Terminal Agent</p>
                </div>
            </div>
          </div>
          <Image
            src={person}
            width={1200}
            height={700}
            alt="a phone showing a successfull transaction"
            className="flex-1 object-contain h-full w-[400px]"
          />
        </div>
      </div>
    </section>
  );
};

export default page;
