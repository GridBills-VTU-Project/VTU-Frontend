import Image from "next/image";
import phone from "../../../../../../public/phone_d.png";
import google from "../../../../../../public/google_icon.png";
import apple from "../../../../../../public/apple_icon.png";
import React from "react";

const Download = () => {
  return (
    <section className=" mx-auto bg-white py-25">
      <div className="w-[80%] mx-auto flex not-mobile:flex-col justify-between">
        <div className="max-w-[50%] not-mobile:max-w-full">
          <h2 className="text-5xl font-black text-[#163145] not-lg:text-4xl leading-15 not-sm:text-2xl mb-4">
            Download Our GridBills Mobile App Now
          </h2>
          <p className="text-xl font-bold text-[#727272] mb-10">
            Download our app for the fastest, most convenient way to send
            Recharge
          </p>
          <div className="flex gap-2 mb-10">
            <button className="p-3 text-sm items-center not-sm:text-xs gap-1 capitalize hover:cursor-pointer flex border-2 border-gray-500 rounded-2xl">
              <Image
                src={google}
                alt="google play store icon"
                width={60}
                height={60}
                className="w-7 not-sm:w-4"
                loading="lazy"
              />
              google play
            </button>
            <button className="p-3 text-sm items-center not-sm:text-xs gap-1 capitalize hover:cursor-pointer flex border-2 border-gray-500 rounded-2xl">
              <Image
                src={apple}
                alt="apple store icon"
                width={60}
                height={60}
                className="w-7 not-sm:w-4"
                loading="lazy"
              />
              apple store
            </button>
          </div>
        </div>
        <div className="flex justify-center mobile:justify-start gap-4 flex-wrap mb-10">
          <Image
            loading="lazy"
            src={phone}
            alt="mobile app"
            width={600}
            height={200}
            className="mx-auto h-100 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Download;
