"use client";
import Select from "@/app/components/ui/Select";
import SelectPlan from "@/app/components/ui/SelectPlan";
import UseAxios from "@/app/customHooks/UseAxios";
import { useGetDataPlans } from "@/app/customHooks/UseQueries";
import UseRole from "@/app/customHooks/UseRole";
import { DataArray } from "@/app/util/types";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const networks = ["MTN", "Airtel", "Glo", "9mobile"];

const DataForm = () => {
  const [networkId, setNetworkId] = useState("1");
  const {
    data: dataplan,
    error,
    isError,
    isLoading,
    isFetching,
    isPending
  } = useGetDataPlans(networkId);

  const api = UseAxios();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{network: string; phone: string; data: DataArray}>({
    network: "MTN",
    phone: "",
    data: {} as DataArray,
  });
  const isAgent = UseRole(["agent"])

  useEffect(() => {
    switch (form.network) {
      case "MTN":
        setNetworkId("1")
        break;
      case "Airtel":
        setNetworkId("4")
        break;
      case "Glo":
        setNetworkId("2")
        break;
      case "9mobile":
        setNetworkId("3")
        break;
      default:
        break;
    }
  }, [form.network]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {

      console.log(form);
      if(Object.keys(form.data).length < 1)
      {
        return toast.info("please select a data plan.")
      }
      const res = await api.post("services/"+networkId, JSON.stringify(form));
      toast.success(res.data.msg || "Success.");
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        return;
      }
      toast.error("something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const selectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10 w-full"
    >
      <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
        {isAgent ?"Sell Data":"Buy Data"}
      </h3>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="mt-10">Select Network</p>
          <Select
            options={networks}
            selected={form}
            setSelected={setForm}
            placeholder="Choose Network"
            name="network"
            withImage={true}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="mt-10">Phone No.</p>
          <input
            value={form.phone}
            name="phone"
            required={true}
            onChange={selectOption}
            type="text"
            className="p-5 rounded-lg bg-[#EEEEEE]"
            placeholder="Enter phone number"
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="mt-10">Data Plan</p>
          <SelectPlan
            options={dataplan || []}
            selected={form.data}
            setSelected={setForm}
            placeholder="Choose Data Plan"
            name="data"
            loading={isLoading || isFetching||isPending || isError}
          />
        </div>
        <button
          disabled={loading}
          className="bg-[#646FC6] hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
        >
          Proceed to Payment
        </button>
      </div>
    </form>
  );
};

export default DataForm;
