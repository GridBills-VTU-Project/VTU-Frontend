import about from "@/../public/abouthero.png";
import power from "@/../public/power.png";
import Image from "next/image";

const page = () => {
  return (
    <section className="bg-[#ffff] text-[#163145]">
      <div className="">
        <div className="flex gap-5 max-mobile:flex-col py-18 w-[80%] mx-auto">
          <div className="flex-1 max-w-[70%] max-mobile:max-w-full">
            <h1 className="max-xs:text-2xl text-4xl font-black not-xl:text-2xl leading-6 mb-7 relative py-10">
              About Us
              <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[20%] mt-1"></div>
              <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[30%] mt-4 max-xs:mt-3"></div>
            </h1>
            <p className="leading-6 mx-auto text-sm text-[#727272] pb-15 max-sm:text-xs">
              GridBills is a reliable VTU platform that gives you fast and
              convenient access to pay for everyday services like airtime
              top-up, data subscriptions, electricity bills, cable TV (DStv,
              GOtv, Startimes), education services, and much more — all in one
              place. Payment is as simple as: Log in – Select – Pay. GridBills
              works seamlessly across all devices. It’s easy to use, secure, and
              designed for your comfort. You can get started instantly by
              creating an account with your email and phone number, or by simply
              paying for any service directly — no stress, no delays. With
              GridBills, you stay connected, powered, and in control — anytime,
              anywhere.
            </p>
          </div>
          <Image
            src={about}
            width={1200}
            height={700}
            alt="a person seated and attending to a customer"
            className="flex-1 object-contain"
          />
        </div>
        <div className="bg-lightbackground py-10 px-20 ">
          <div className="w-[80%] mx-auto flex text-center justify-between max-sm:flex-col gap-20">
            <div className="max-w-[400px]  border border-[#000000]/20 p-3">
              <h2 className="max-xs:text-2xl text-4xl font-black not-xl:text-2xl leading-6 mb-7 relative ">
                who we are
                <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[60%] mt-1"></div>
                <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[70%] mt-4 max-xs:mt-3"></div>
              </h2>
              <p className="leading-6 mx-auto text-sm text-[#727272] pb-3 max-sm:text-xs">
                Gridbills Limited is a leading bill payment providers in
                Nigeria, offering instant and secure electricity, airtime, data,
                bill payments, and more.
              </p>
            </div>
            <div className="max-w-[400px]  border border-[#000000]/20 p-3">
              <h3 className="max-xs:text-2xl text-4xl font-black not-xl:text-2xl leading-6 mb-7 relative ">
                Our Mission
                <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[60%] mt-1"></div>
                <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[70%] mt-4 max-xs:mt-3"></div>
              </h3>
              <p className="leading-6 mx-auto text-sm text-[#727272] pb-3 max-sm:text-xs">
                Our mission is simply to make recharging and bill payments
                faster, easier, and more affordable for everyone.
              </p>
            </div>
          </div>
        </div>
        <section className="w-[80%] mx-auto text-center py-20">
          <h4 className="max-xs:text-2xl text-4xl font-black not-xl:text-2xl leading-6 mb-12 relative ">
            Our platform
            <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[55%] mt-1"></div>
            <div className="max-xs:w-15 max-xs:h-1 w-30 h-2 bg-red-500 absolute left-[60%] mt-4 max-xs:mt-3"></div>
          </h4>
          <div className="flex xl:justify-around gap-5 flex-wrap max-lg:justify-center">
            <div className="bg-[#646FC6]/30 max-w-[250px] flex flex-col items-center py-7 rounded-2xl">
              <div className="bg-[#646FC6]/40 p-3 rounded-full mb-4">
                <Image
                  src={power}
                  width={30}
                  height={30}
                  alt="image of an electricity symbol"
                  className="w-5"
                />
              </div>
              <p className="leading-6 mx-auto text-sm text-[#163145] pb-1 max-sm:text-xs font-semibold">
                Pay electricity bills & cable TV subscriptions (DSTV, GOTV,
                Startimes)
              </p>
            </div>
            <div className="bg-[#646FC6]/30 max-w-[250px] flex flex-col items-center py-7 rounded-2xl">
              <div className="bg-[#646FC6]/40 p-3 rounded-full mb-4">
                <Image
                  src={power}
                  width={30}
                  height={30}
                  alt="image of an electricity symbol"
                  className="w-5"
                />
              </div>
              <p className="leading-6 mx-auto text-sm text-[#163145] pb-1 max-sm:text-xs font-semibold">
                Recharge airtime & data for all networks (MTN, Glo, Airtel,
                9mobile)
              </p>
            </div>
            <div className="bg-[#646FC6]/30 max-w-[250px] flex flex-col items-center py-7 rounded-2xl">
              <div className="bg-[#646FC6]/40 p-3 rounded-full mb-4">
                <Image
                  src={power}
                  width={30}
                  height={30}
                  alt="image of an electricity symbol"
                  className="w-5"
                />
              </div>
              <p className="leading-6 mx-auto text-sm text-[#163145] pb-1 max-sm:text-xs font-semibold">
                Buy exam pins like WAEC, NECO, JAMB instantly
              </p>
            </div>
            <div className="bg-[#646FC6]/30 max-w-[250px] flex flex-col items-center py-7 rounded-2xl">
              <div className="bg-[#646FC6]/40 p-3 rounded-full mb-4">
                <Image
                  src={power}
                  width={30}
                  height={30}
                  alt="image of an electricity symbol"
                  className="w-5"
                />
              </div>
              <p className="leading-6 mx-auto text-sm text-[#163145] pb-1 max-sm:text-xs font-semibold">
                Become a reseller and grow your business with unbeatable
                discounts
              </p>
            </div>
          </div>
          <p className="py-18">
            We pride ourselves on security, speed, and customer satisfaction
          </p>
        </section>
      </div>
    </section>
  );
};

export default page;
