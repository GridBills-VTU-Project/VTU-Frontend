import Image from "next/image";
import React from "react";

const loading = () => {
  return <NormalLoadingScreen/>;
};

export default loading;

export function NormalLoadingScreen() {
  return (
<div className="fixed inset-0 flex items-center justify-center bg-darkbackground">
  <div className="animate-[pulse_1.5s_ease-in-out_infinite]">
    <Image
      priority={true}
      src={"/logo.png"}
      alt="GridBill's Logo"
      width={200}
      height={200}
      className="w-full max-w-xs"
    />
  </div>
</div>
  );
}
