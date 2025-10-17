import Image from "next/image";
import React from "react";
import si from "@/../public/signup.png";
import SignupForm from "./signupForm";
const page = () => {
  return (
    <section className="bg-[#ffffff] flex ">
      <div className="w-full flex-1 h-full max-xl:hidden">
        <Image
          className="object-cover w-full h-full "
          src={si}
          alt="a picture of a man starring down at his phone smiling"
          width={1500}
          height={700}
        />
      </div>
      <div className="flex-1">
        <h2 className="text-center max-xs:text-2xl text-4xl font-black not-xl:text-2xl leading-6 mt-10">
          Sign up
        </h2>
        <p className="leading-6 mx-auto text-sm text-[#727272] py-5 max-sm:text-xs text-center">
          Please fill in your details.
        </p>
        <SignupForm />
      </div>
    </section>
  );
};

export default page;
