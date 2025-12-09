import Image from "next/image";
import logos1 from "../../../../../../public/all_partners.png";
import { Card } from "./Card";
import { serviceCards } from "@/app/constants/cardConstants";
import Link from "next/link";

const Partners = () => {
  return (
    <section className=" mx-auto bg-white pb-25">
      <div className="w-[80%] mx-auto flex flex-col justify-between mb-25">
        <div className="text-center not-mobile:w-full w-[50%] mx-auto">
          <h2 className=" text-4xl font-black text-[#163145] relative not-xl:text-2xl leading-6 mb-7">
            Our Partners
            <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[70%] mt-1"></div>
            <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[75%] mt-4 max-xs:mt-3"></div>
          </h2>
          <p className="text-xl font-bold text-[#727272] mb-3">
            Providing you seamless services
          </p>
        </div>
        <div className="flex items-start">
          {/* Partner logos can be added here */}
          <Image
            loading="lazy"
            src={logos1}
            alt="mtn logo"
            width={500}
            height={500}
            className="h-auto object-contain w-full"
          />
        </div>
      </div>
      <div className="w-[80%] mx-auto flex flex-col justify-between">
        <div className="text-center not-mobile:w-full relative w-[70%] mx-auto">
          <h2 className=" max-xs:text-2xl text-4xl font-black text-[#163145] not-xl:text-2xl leading-6 mb-7">
            We Provide Awesome Services
            <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[80%] mt-1"></div>
            <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[85%] mt-4 max-xs:mt-3"></div>
          </h2>
          <p className="text-xl font-bold text-[#727272] mb-10">
            Making payments should be easy. GRIDBILLS lets you pay for your
            favorite services quickly and conveniently anytime, anywhere
          </p>
        </div>
        <div className="flex gap-5 flex-wrap justify-center">
          {serviceCards.map((item,index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="mt-30 mx-auto w-full text-center">
        <Link href={"/dashboard?tab=serivces"} className=" bg-[#646FC6] py-5 px-18 hover:cursor-pointer hover:bg-[#646FC6]/90 rounded-xl text-[#ffffff] font-medium">
          Discover More
        </Link>
      </div>
    </section>
  );
};

export default Partners;
