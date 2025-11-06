import Select from "@/app/components/ui/Select";
import UseAxios from "@/app/customHooks/UseAxios";
import { selectOption } from "@/app/util/functions";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
const networks = ["MTN", "Airtel", "Glo", "9mobile"];
const ExamCardForm = () => {
  //   const router = useRouter();
  const api = UseAxios();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    examType: "",
    network: "",
    amount: "",
  });
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(form);
      const res = await api.post("service/airtime", JSON.stringify(form));
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

  return (
    <form onSubmit={submit} className="flex flex-col bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10 w-full">
      <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
        Purchase Scratch card
      </h3>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="mt-10">Exam type</p>
          <Select
            options={networks}
            selected={form}
            setSelected={setForm}
            placeholder="Please select Exam type"
            name="examType"
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="mt-10">Network Operator</p>

          <Select
            options={networks}
            selected={form}
            setSelected={setForm}
            placeholder="Choose Network"
            name="network"
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="mt-10">Amount</p>
          <input
            value={form.amount}
            name="amount"
            required={true}
            onChange={(e) => {
              selectOption(e, setForm);
            }}
            type="text"
            className="p-5 rounded-lg bg-[#EEEEEE]"
            placeholder="Enter amount"
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

export default ExamCardForm;
