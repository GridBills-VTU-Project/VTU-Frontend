import SelectPlan from "@/app/components/ui/SelectPlan";
import UseAxios from "@/app/customHooks/UseAxios";
import { useGetExamPackages } from "@/app/customHooks/UseQueries";
import { isAxiosError } from "axios";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
const ExamCardForm = () => {
  const api = UseAxios();

  const { data, error, isError, isLoading, isFetching, isPending } =
    useGetExamPackages();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    examType: "",
    isChecked: false,
  });

  const examPackages = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      sellingPrice: item.sellingPrice,
      name: item.planCode,
      planCode: item.planCode,
      plan: item.plan,
    }));
  }, [data]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(form);
      const res = await api.patch("services", JSON.stringify(form));
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
    <form
      onSubmit={submit}
      className="flex flex-col bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10 w-full"
    >
      <h3 className="capitalize font-bold text-3xl text-[#163145] ">
        Purchase Scratch card
      </h3>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="mt-10">Exam type</p>
          <SelectPlan
            loading={isLoading || isFetching || isPending}
            options={examPackages || []}
            selected={form}
            setSelected={setForm}
            placeholder="Please select Exam type"
            name="examType"
          />
        </div>
        {/* <div className="flex flex-col gap-3">
          <p className="mt-10">Network Operator</p>

          <Select
            options={networks}
            selected={form}
            setSelected={setForm}
            placeholder="Choose Network"
            name="network"
          />
        </div> */}

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
          className="flex justify-center gap-2 bg-[#646FC6] hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
        >
          <div className={"flex justify-center " + (!loading && " hidden")}>
            <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          Proceed to Payment
        </button>
      </div>
    </form>
  );
};

export default ExamCardForm;
