import Select from "@/app/components/ui/Select";
import SelectPlan from "@/app/components/ui/SelectPlan";
import { numRegex, tvSubs } from "@/app/constants/constant";
import UseAxios from "@/app/customHooks/UseAxios";
import { useGetTvPackages } from "@/app/customHooks/UseQueries";
import { selectOption } from "@/app/util/functions";
import { isAxiosError } from "axios";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
const SubscriptionForm = () => {
  const api = UseAxios();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    cableType: "DSTV",
    package: "",
    serialNo: "",
    phone: "",
    isChecked: false,
  });
  const { data, error, isError, isLoading, isFetching, isPending } =
    useGetTvPackages(form.cableType);
  const tvPackages = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      sellingPrice: item.amount,
      name: item.plan,
      planCode: item.planCode,
      plan: item.plan,
    }));
  }, [data]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(form);
      if (form.cableType === "") {
        return toast.info("please select a cable");
      } else if (Object.keys(form.package).length < 1) {
        return toast.info("please select a package.");
      } else if (!numRegex.test(form.serialNo)) {
        return toast.info("Enter a valid Smart card number");
      } else if (!numRegex.test(form.phone)) {
        return toast.info("Enter a valid Phone number");
      }
      const res = await api.post(
        "services/tv/" + form.cableType,
        JSON.stringify(form)
      );
      toast.success(res.data.msg || "Success.");
      setForm({
        cableType: "DSTV",
        package: "",
        serialNo: "",
        phone: "",
        isChecked: false,
      });
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
  return (
    <form onSubmit={submit} className="flex flex-col rounded-lg w-full">
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10">
        <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
          Tv Subscription
        </h3>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <p className="mt-10">Choose Cable</p>
            <Select
              options={tvSubs}
              selected={form}
              setSelected={setForm}
              placeholder="Choose Cable"
              name="cableType"
              withImage={true}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="mt-10">Choose Package</p>
            <SelectPlan
              loading={isLoading || isFetching || isPending || isError}
              options={tvPackages || []}
              selected={form}
              setSelected={setForm}
              placeholder="Select package"
              name="package"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10">
        <h3 className="capitalize font-bold text-3xl text-[#163145] ">
          Enter Details
        </h3>
        <p>Provide your smartcard or IUC number</p>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <p className="mt-10">Smartcard/IUC Number</p>

            <input
              value={form.serialNo}
              name="serialNo"
              required={true}
              onChange={(e) => selectOption(e, setForm)}
              type="text"
              className="p-5 rounded-lg bg-[#EEEEEE]"
              placeholder="e.g 1234567"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="mt-10">Phone Number</p>

            <input
              value={form.phone}
              name="phone"
              required={true}
              onChange={(e) => selectOption(e, setForm)}
              type="text"
              className="p-5 rounded-lg bg-[#EEEEEE]"
              placeholder="080...."
            />
          </div>
          <div className="flex items-center w-fit gap-3">
            <input
              name="ischecked"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, isChecked: e.target.checked }));
              }}
              type="checkbox"
              className="accent-darkbackground"
            />
            <p className="">Use Points</p>
          </div>
        </div>
      </div>
      <button
        disabled={loading}
        className="bg-[#646FC6] flex justify-center gap-2 hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
      >
        <div
          className={"flex justify-center max-w-fit " + (!loading && " hidden")}
        >
          <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        Proceed to Payment
      </button>
    </form>
  );
};

export default SubscriptionForm;
