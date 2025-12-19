import { Smartphone } from "lucide-react";
import React from "react";

const AdminVtuServicesCard = () => {
  return (
    <div className="max-w-[400px] bg-[#FFFFFF] p-5 rounded-lg">
      <div className="flex gap-5">
        <div className="bg-[#646FC64D] rounded-full w-fit h-fit p-5">
          <Smartphone color="#646FC6" />
        </div>
        <div className="flex flex-col justify-between gap-5">
          <h1 className="font-bold text-darkbackground text-xl w-full">
            Airtime Top-up
          </h1>
          <p className="bg-blue text-white rounded-full px-3 py-1 w-fit text-sm">
            Active
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <div className="font-bold text-xl w-full flex justify-between">
          <p className="text-textlight font-medium">
            Today&apos;s Transactions
          </p>
          <p>245</p>
        </div>
        <div className="font-bold text-xl w-full flex justify-between">
          <p className="text-textlight font-medium">Today&apos;s Revenue</p>
          <p className="text-green">₦367,500</p>
        </div>
      </div>
      <div className="border-textlight border-2 my-5"></div>
        <h2 className="font-bold text-darkbackground text-xl w-full mb-1">
          Airtime Top-up
        </h2>
      <div className="flex items-center gap-5">
        <input
          disabled={true}
          name="first_name"
          // value={user?.id}
          // onChange={(e) => selectOption(e, setPasswordForm)}
          type="text"
          className={
            " outline-darkbackground border-2 border-[#7575754D] p-4 rounded-2xl bg-[#8080801A] flex-2"
          }
          placeholder="Enter first name"
        />
        <button
          onClick={() => {}}
          className="flex bg-[#8080801A] p-5 gap-1 py-4 border-2 border-[#7575754D] rounded-lg"
        >
          <p className="text-sm">Update</p>
        </button>
      </div>
    </div>
  );
};

export default AdminVtuServicesCard;
