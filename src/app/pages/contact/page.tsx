import Image from "next/image";
import React from "react";
import power from "@/../public/power.png";

const page = () => {
  return (
    <section className="bg-[#ffff] text-[#163145] pb-20">
      <div className="max-w-[80%] mx-auto">
        <h1 className="text-center max-xs:text-2xl text-4xl font-black not-xl:text-2xl leading-6 mb-7 relative pt-18 max-sm:px-10">
          Contact Us
          <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[49%] mt-1"></div>
          <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[53%] mt-4 max-xs:mt-3"></div>
        </h1>
        <p className=" leading-6 mx-auto text-sm text-[#727272] pb-15 max-sm:text-xs text-center">
          Need assistance? Our support team is always available.
        </p>
        <form
          action=""
          className="flex flex-col max-w-[700px] mx-auto bg-[#AAAAAA]/20 p-10 mb-10 rounded-lg"
        >
          <div className="flex max-mobile:gap-10 justify-between pb-10 max-mobile:flex-col">
            <div className="flex flex-col">
              <p className="mb-2">Name</p>
              <input
                type="text"
                className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
                placeholder="Please enter your name"
              />
            </div>
            <div className="flex flex-col">
              <p className="mb-2">Phone</p>
              <input
                type="tel"
                className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
                placeholder="Please enter your number"
              />
            </div>
          </div>
          <div className="flex flex-col pb-10">
            <p className="mb-2">Email</p>
            <input
              type="text"
              className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg"
              placeholder="Please enter your name"
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2">Message</p>
            <textarea
              className="border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg min-h-[200px]"
              placeholder="Please enter your name"
            >
              {" "}
            </textarea>
          </div>
          <button className="bg-[#646FC6] w-[30%] text-[#ffff] mt-15 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer ">
            Send Message
          </button>
        </form>
        <div>
          <h2 className="text-center max-xs:text-2xl text-4xl font-black not-xl:text-2xl leading-6 mb-7 pt-18 max-sm:px-10">
            Need assistance?
          </h2>
          <p className=" leading-6 mx-auto text-sm text-[#727272] pb-15 max-sm:text-xs text-center">
            Our support team is always available.
          </p>
          <div className="flex 2xl:justify-between max-xl:flex-wrap gap-7 max-lg:justify-center">
            <div className="bg-[#646FC6]/20 w-[350px] h-[300px] flex flex-col items-center justify-center rounded-2xl gap-5">
              <div className="bg-[#646FC6]/40 p-3 rounded-full">
                <Image
                  src={power}
                  width={30}
                  height={30}
                  alt="image of an electricity symbol"
                  className="w-5"
                />
              </div>
              <h3 className="text-center max-xs:text-lg text-2xl font-black not-xl:text-xl leading-6 max-sm:px-10">
                Need assistance?
              </h3>
              <p className=" leading-6 mx-auto text-sm text-[#727272]  max-sm:text-xs text-center">
                Need assistance? Our support team is always available.
              </p>
            </div>
            <div className="bg-[#646FC6]/20 w-[350px] h-[300px] flex flex-col items-center justify-center rounded-2xl gap-5">
              <div className="bg-[#646FC6]/40 p-3 rounded-full">
                <Image
                  src={power}
                  width={30}
                  height={30}
                  alt="image of an electricity symbol"
                  className="w-5"
                />
              </div>
              <h3 className="text-center max-xs:text-lg text-2xl font-black not-xl:text-xl leading-6 max-sm:px-10">
                Need assistance?
              </h3>
              <p className=" leading-6 mx-auto text-sm text-[#727272]  max-sm:text-xs text-center">
                Need assistance? Our support team is always available.
              </p>
            </div>
            <div className="bg-[#646FC6]/20 w-[350px] h-[300px] flex flex-col items-center justify-center rounded-2xl gap-5">
              <div className="bg-[#646FC6]/40 p-3 rounded-full">
                <Image
                  src={power}
                  width={30}
                  height={30}
                  alt="image of an electricity symbol"
                  className="w-5"
                />
              </div>
              <h3 className="text-center max-xs:text-lg text-2xl font-black not-xl:text-xl leading-6 max-sm:px-10">
                Need assistance?
              </h3>
              <p className=" leading-6 mx-auto text-sm text-[#727272]  max-sm:text-xs text-center">
                Need assistance? Our support team is always available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
