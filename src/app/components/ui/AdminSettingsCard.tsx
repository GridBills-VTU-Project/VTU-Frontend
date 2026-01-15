import { GraduationCap, Tv } from "lucide-react";
import React from "react";
import Select from "./Select";
import { formatAmount } from "@/app/util/functions";

const icons = [
  <GraduationCap color="#646FC6"/>, <Tv color="#646FC6" />,
]

const AdminSettingsCard = ({title,paragraph,packages,amount}:{title:string,paragraph:string,packages:string[],amount:string}) => {
  // Function to select icon based on title
const getIcon = (title: string) => {
  switch (title) {  // Using toLowerCase for case-insensitive matching
    case 'Update Exam Package':
      return icons[0];
    case 'Update TV Package':
      return icons[1];
    default:
      return icons[0];
  }
};
  const [form, setForm] = React.useState<any>({});
  return (
    <div className="max-w-[550px] bg-[#FFFFFF] p-10 rounded-lg w-full">
      <div className="flex gap-5">
        <div className="bg-[#646FC64D] rounded-full w-fit h-fit p-3">
          {getIcon(title)}
        </div>
        <div className="flex flex-col justify-between gap-1">
          <h1 className="font-bold text-darkbackground text-xl w-full">
            {title}
          </h1>
          <p className="text-textlight font-medium">
            {paragraph}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <p className="mt-10">Select Package</p>
          <Select
            options={packages}
            selected={form}
            setSelected={setForm}
            placeholder="Choose Network"
            name="network"
            withImage={true}
          />
        </div>
        <div className="flex flex-col bg-[#EEEEEE] h-fit p-5 rounded-lg">
          <p className="">Current Price</p>
          <p className="font-bold">₦{formatAmount(amount)}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="">New Selling Price (₦)</p>
            <input
              value={form.meterNum}
              name="meterNum"
              required={true}
              // onChange={selectOption}
              type="text"
              className="p-5 rounded-lg bg-[#EEEEEE]"
              placeholder="Enter meter number"
            />
        </div>
        <button
          disabled={false}
          className="bg-[#646FC6] flex justify-center gap-2 hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
        >
          <div
            className={"flex justify-center max-w-fit " + (!false && " hidden")}
          >
            <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          Update Price
        </button>
      </div>
    </div>
  );
};

export default AdminSettingsCard;
