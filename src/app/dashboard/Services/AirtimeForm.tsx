import Select from "@/app/components/ui/Select";
import { networks, numRegex } from "@/app/constants/constant";
import UseAxios from "@/app/customHooks/UseAxios";
import { useAuthUser } from "@/app/customHooks/UseQueries";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
// const networks = ["MTN", "Airtel", "Glo", "9mobile"];
const AirtimeForm = () => {
  const api = UseAxios();
  const [loading, setLoading] = useState(false);
  const { data: user } = useAuthUser();
  const [form, setForm] = useState({
    network: "",
    phone: user?.phoneNumber || "",
    amount: "",
  });
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(form);
      if (!numRegex.test(form.amount) || form.phone.length < 9) {
        return toast.info("Please enter a valid phone number.");
      } else if (!numRegex.test(form.amount) || parseInt(form.amount) < 10) {
        return toast.info("Amount must be a valid number.");
      }
      const res = await api.patch("services/data", JSON.stringify(form));
      toast.success(res.data.msg || "Success.");
      setForm({
        network: "",
        phone: user?.phoneNumber || "",
        amount: "",
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
  const selectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form
      onSubmit={submit}
      className="flex flex-col w-full bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10"
    >
      <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
        {user?.role == "agent" ? "Sell Airtime" : "Buy Airtime"}
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
          <p className="mt-10">Enter amount</p>
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
        <button
          disabled={loading}
          className="bg-[#646FC6] flex justify-center gap-2 hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
        >
          <div
            className={
              "flex justify-center max-w-fit " + (!loading && " hidden")
            }
          >
            <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          Pay
        </button>
      </div>
    </form>
  );
};

export default AirtimeForm;
