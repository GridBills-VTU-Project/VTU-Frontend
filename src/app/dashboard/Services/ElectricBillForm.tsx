import Select from "@/app/components/ui/Select";
import { meterTypes, numRegex, serviceTypes } from "@/app/constants/constant";
import UseAxios from "@/app/customHooks/UseAxios";
import { handleCopy } from "@/app/util/functions";
import { ElectricityPurchaseForm, ValidateMeterRes } from "@/app/util/types";
import { isAxiosError } from "axios";
import { Copy, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ElectricBillForm = () => {
  const api = UseAxios();
  const [loading, setLoading] = useState(false);
  const [canCopy, setCanCopy] = useState<null | string>(null);
  const [validateMterRes, setValidateMterRes] =
    useState<null | ValidateMeterRes>(null);
  const [form, setForm] = useState<ElectricityPurchaseForm>({
    meterType: "",
    meterNum: "",
    servicID: "",
    amount: "",
    phone:"",
    isChecked: false,
  });

  const submit = async (form: ElectricityPurchaseForm) => {
    setLoading(true);

    try {
      console.log(form);
      if (!numRegex.test(form.meterNum) || form.meterNum.length < 11) {
        return toast.info("Please enter a valid meter number.");
      } else if (!numRegex.test(form.amount) || parseInt(form.amount) < 20) {
        return toast.info("Amount must be a valid number.");
      } else if (!numRegex.test(form.phone)) {
        return toast.info("phone must be a valid number.");
      }
      const res = await api.post("services/electricbill", JSON.stringify(form));
      toast.success(res.data.msg || "Success.");
      setForm({
        meterType: "",
        meterNum: "",
        servicID: "",
        amount: "",
        phone:"",
        isChecked: false,
      });
      setValidateMterRes(null);
      // setCanCopy(res.data?.response?.description?.Token);
      setCanCopy(res.data?.token);
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

  const validate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(form);
      if (!numRegex.test(form.meterNum) || form.meterNum.length < 11) {
        return toast.info("Please enter a valid meter number.");
      } else if (!numRegex.test(form.amount) || parseInt(form.amount) < 20) {
        return toast.info("Amount must be a valid number.");
      } else if (!numRegex.test(form.phone)) {
        return toast.info("phone must be a valid number.");
      }
      const res = await api.patch("services/electricbill", JSON.stringify(form));
      toast.success("Validate details below.");
      setValidateMterRes(res.data);
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
    <>
      <div className="flex flex-col bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10 w-full overflow-hidden">
        <h2 className="capitalize font-bold text-3xl  text-[#163145] ">
          Pay Bills
        </h2>
        <form onSubmit={validate} className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <p className="mt-10">Meter type</p>
            <Select
              options={meterTypes}
              selected={form}
              setSelected={setForm}
              placeholder="Please select Meter type"
              name="meterType"
              withImage={false}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="mt-10">Meter Number</p>
            <input
              value={form.meterNum}
              name="meterNum"
              required={true}
              onChange={selectOption}
              type="text"
              className="p-5 rounded-lg bg-[#EEEEEE]"
              placeholder="Enter meter number"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="mt-10">Select Provider</p>

            <Select
              options={serviceTypes}
              selected={form}
              setSelected={setForm}
              placeholder="Please Select Provider"
              name="servicID"
              withImage={false}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="mt-10">Amount</p>
            <input
              value={form.amount}
              name="amount"
              required={true}
              onChange={selectOption}
              type="text"
              className="p-5 rounded-lg bg-[#EEEEEE]"
              placeholder="Enter amount"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="mt-10">Phone</p>
            <input
              value={form.phone}
              name="phone"
              required={true}
              onChange={selectOption}
              type="text"
              className="p-5 rounded-lg bg-[#EEEEEE]"
              placeholder="phone number"
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
          <button
            disabled={loading}
            className="bg-[#646FC6] flex justify-center gap-1 hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
        ><div className={"flex justify-center max-w-fit " + (!loading && " hidden")}>
            <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
            Validate
          </button>
        </form>
        {canCopy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="flex flex-col w-fit py-5 px-10 justify-center items-center bg-neutral-100 rounded-lg shadow-2xl relative">
              <button
                onClick={() => setCanCopy(null)}
                className="absolute top-2 right-2 bg-darkbackground p-1 rounded-sm text-white"
              >
                <X width={20} height={20} />
              </button>

              <div className="flex flex-col gap-2 mb-2 mt-6">
                <h3 className="text-xl font-semibold text-main-heading">
                  Token
                </h3>
                <p>{canCopy}</p>
                <button
                  type="button"
                  onClick={() => handleCopy(canCopy)}
                  className="px-3 py-1 border-2 rounded-lg border-primary text-primary font-light text-xs max-w-fit"
                >
                  <Copy strokeWidth={1} width={15} />
                </button>
              </div>

              <button
              onClick={() => setCanCopy(null)}
                disabled={!canCopy}
                className="bg-[#FF3B30] text-white py-2 px-4 rounded-xl"
              >
                Ok
              </button>
            </div>
          </div>
        )}
      </div>
      {validateMterRes && (
        <div className="flex flex-col bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10 w-full overflow-hidden">
          <h3 className="capitalize font-bold text-3xl text-[#163145]">
            Validated Details
          </h3>
          <div className="flex flex-col gap-5">
            <ul className="flex flex-col gap-5">
              <li className="flex justify-between mt-5">
                <h4 className="text-[#7D7979]">Customer Name:</h4>
                <p>{validateMterRes.customer_Name}</p>
              </li>
              <li className="flex justify-between">
                <h4 className="text-[#7D7979]">Address:</h4>
                <p>{validateMterRes.address}</p>
              </li>
              <li className="flex justify-between">
                <h4 className="text-[#7D7979]">Meter Number:</h4>
                <p>{validateMterRes.meterNumber}</p>
              </li>
            </ul>
            <button
              onClick={() => submit(form)}
              disabled={loading || validateMterRes == null}
              className={
                " w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg flex justify-center text-center  " +
                (validateMterRes == null
                  ? " bg-[#646fc6]/30 hover:!cursor-not-allowed"
                  : " bg-[#646FC6] hover:bg-[#646FC6]/90 hover:cursor-pointer")
              }
            >
              <div
                className={
                  "flex justify-center max-w-fit " + (!loading && " hidden")
                }
              >
                <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              Proceed
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ElectricBillForm;
