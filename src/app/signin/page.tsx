import Image from "next/image";
import React, { Suspense } from "react";
import si from "@/../public/signup.png";
import SigninForm from "./SigninForm";
import { NormalLoadingScreen } from "../loading";

const Page = () => {
  return (
    <section className="bg-[#ffffff] flex w-full">
      <div className="w-full flex-1 h-full max-xl:hidden">
        <Image
          className="object-cover w-full h-full object- "
          src={si}
          alt="a picture of a man starring down at his phone smiling"
          width={1500}
          height={700}
        />
      </div>
      <div className="flex-1 w-full">
        <h2 className="text-center max-xs:text-xl text-4xl font-black not-xl:text-2xl leading-6 mt-10">
          Sign in to Account
        </h2>
        <p className="leading-6 mx-auto text-sm text-[#727272] py-5 max-sm:text-xs text-center">
          Please fill in your details.
        </p>
        <Suspense fallback={<NormalLoadingScreen/>}>
          <SigninForm />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
