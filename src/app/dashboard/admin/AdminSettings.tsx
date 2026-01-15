"use client";
import Select from "@/app/components/ui/Select";
import SelectPlan from "@/app/components/ui/SelectPlan";
import { numRegex, tvSubs } from "@/app/constants/constant";
import UseAxios from "@/app/customHooks/UseAxios";
import {
  useUpdateExamPackagePric,
  useUpdateTvPackagePrice,
} from "@/app/customHooks/useMutation";
import {
  UseGetAdminExamPackages,
  UseGetAdminTvackages,
  UseGetDataSync,
} from "@/app/customHooks/UseQueries";
import { formatAmount } from "@/app/util/functions";
import { isAxiosError } from "axios";
import { Database, GraduationCap, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const AdminSettings = () => {
  const api = UseAxios();
  const [addTvPackage, setAddTvPackage] = useState({
    network: "",
    planName: "",
    planCode: "",
    costAmount: "",
    sellingPrice: "",
  });
const [addTvPackageLoading, setAddTvPackageLoading] = useState(false)
  const {
    data: examData,
    isLoading: examLoading,
    isError,
    refetch,
    isFetching,
    isPending,
  } = UseGetAdminExamPackages();

  const {
    data: tvData,
    isLoading: tvLoading,
    isError: tvError,
    refetch: tvRefetch,
    isFetching: tvIsFetching,
    isPending: tvIsPending,
  } = UseGetAdminTvackages();

  const {
    data: syncData,
    isLoading: syncLoading,
    isError: syncError,
    refetch: syncRefetch,
    isFetching: syncIsFetching,
    isPending: syncIsPending,
  } = UseGetDataSync();

  const { mutateAsync, isPending: ExamSubmitting } = useUpdateExamPackagePric();

  const { mutateAsync: tvMutateAsync, isPending: TvSubmitting } =
    useUpdateTvPackagePrice();

  const [examForm, setExamForm] = useState({
    examType: {} as any,
    newSellingPrice: "",
  });

  const [tvForm, setTvPackage] = useState({
    tvPackage: {} as any,
    newSellingPrice: "",
  });

  const examPackages = useMemo(() => {
    if (!examData) return [];

    return examData.map((item) => ({
      sellingPrice: item.sellingPrice,
      name: item.plan,
      planCode: item.planCode,
      plan: item.plan,
    }));
  }, [examData]);

  const tvPackages = useMemo(() => {
    if (!tvData) return [];

    return tvData.map((item) => ({
      sellingPrice: item.sellingPrice,
      name: item.plan,
      planCode: item.planCode,
      plan: item.plan,
    }));
  }, [tvData]);

  // for the exam package price update
  const handleExamFormSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(examForm);
      if (!examForm.examType) {
        toast.warn("Please select exam package.");
      } else if (Object.keys(examForm.examType).length === 0) {
        toast.warn("Please select exam package.");
      } else if (
        !examForm.newSellingPrice ||
        !numRegex.test(examForm.newSellingPrice)
      ) {
        toast.warn("please add a new selling price in figures.");
      }
      await mutateAsync({
        examPackage: examForm.examType,
        newPrice: examForm.newSellingPrice,
      });
      setExamForm({
        examType: {} as any,
        newSellingPrice: "",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        return;
      }
      toast.error("something went wrong.");
    }
  };

  // for the tv package price update
  const handleTvFormSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(tvForm);
      if (!tvForm.tvPackage) {
        toast.warn("Please select tv Package.");
      } else if (Object.keys(tvForm.tvPackage).length === 0) {
        toast.warn("Please select tv Package.");
      } else if (
        !tvForm.newSellingPrice ||
        !numRegex.test(tvForm.newSellingPrice)
      ) {
        toast.warn("please add a new selling price in figures.");
      }
      await tvMutateAsync({
        tvPackage: tvForm.tvPackage,
        newPrice: tvForm.newSellingPrice,
      });
      setTvPackage({
        tvPackage: {} as any,
        newSellingPrice: "",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        return;
      }
      toast.error("something went wrong.");
    }
  };

  // for the adding tv package
  const handleAddTvPackageFormSumbit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      setAddTvPackageLoading(true)
      console.log(addTvPackage);
      if (!addTvPackage.network || !tvSubs.includes(addTvPackage.network)) {
        toast.warn("Please select tv provider.");
        return;
      } else if (!addTvPackage.planName) {
        toast.warn("Please add a plan name");
        return;
      } else if (!addTvPackage.planCode) {
        toast.warn("Please add a plan Code");
        return;
      } else if (
        !addTvPackage.costAmount ||
        !numRegex.test(addTvPackage.costAmount)
      ) {
        toast.warn("please add a cost price in figures.");
        return;
      } else if (
        !addTvPackage.sellingPrice ||
        !numRegex.test(addTvPackage.sellingPrice)
      ) {
        toast.warn("please add a selling price in figures.");
        return;
      }
      const res = await api.post("admin/settings/tv",addTvPackage);
      toast.success(res.data.msg||"Success.");

      setAddTvPackage({
        network: "",
        planName: "",
        costAmount: "",
        sellingPrice: "",
        planCode:""
      });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        return;
      }
      toast.error("something went wrong.");
    }finally{
      setAddTvPackageLoading(false)
    }
  };

  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold text-darkbackground text-3xl max-xs:text-2xl w-full">
          Admin Settings
        </h1>
        <p className="text-[#7D7979] text-lg font-(family-name:--font-manrope) font-bold ">
          Manage packages, prices, and synchronize data
        </p>
      </div>
      <div className="mt-20 flex flex-wrap gap-30 max-[1150]:justify-center">
        {/* exam form */}
        <div
          className={
            "max-w-[550px] h-[700px] bg-[#FFFFFF] p-10 rounded-lg w-full " +
            (examLoading && " shimmer")
          }
        >
          <div className={"w-full " + (examLoading && " hidden")}>
            <div className="flex gap-5">
              <div className="bg-[#646FC64D] rounded-full w-fit h-fit p-3">
                {/* {getIcon(title)} */}
                <GraduationCap color="#646FC6" />
              </div>
              <div className="flex flex-col justify-between gap-1">
                <div className="flex gap-2">
                  <h1 className="font-bold text-darkbackground text-xl">
                    {"Update Exam Package"}
                  </h1>
                  <button onClick={() => refetch()}>
                    <RefreshCcw />
                  </button>
                </div>
                <p className="text-textlight font-medium">
                  {"Modify the selling price for exam scratch cards"}
                </p>
              </div>
            </div>
            <form
              onSubmit={handleExamFormSumbit}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-3">
                <p className="mt-10">Select Package</p>
                <SelectPlan
                  loading={examLoading || isFetching || isPending}
                  options={examPackages || []}
                  selected={examForm}
                  setSelected={setExamForm}
                  placeholder="Please select Exam type"
                  name="examType"
                />
              </div>
              <div className="flex flex-col bg-[#EEEEEE] h-fit p-5 rounded-lg">
                <p className="">Current Price</p>
                <p className="font-bold">
                  ₦
                  {examData &&
                    formatAmount(examForm.examType.sellingPrice || 0)}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="">New Selling Price (₦)</p>
                <input
                  value={examForm.newSellingPrice}
                  name="newSellingPrice"
                  required={true}
                  onChange={(e) =>
                    setExamForm((prev) => ({
                      ...prev,
                      newSellingPrice: e.target.value,
                    }))
                  }
                  type="text"
                  className="p-5 rounded-lg bg-[#EEEEEE]"
                  placeholder="Enter new price"
                />
              </div>
              <button
                disabled={ExamSubmitting}
                // onClick={() => {
                //   console.log(examForm);
                // }}
                className="bg-[#646FC6] flex justify-center gap-2 hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
              >
                <div
                  className={
                    "flex justify-center max-w-fit " +
                    (!ExamSubmitting && " hidden")
                  }
                >
                  <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                Update Price
              </button>
            </form>
          </div>
        </div>

        {/* tv package form */}
        <div
          className={
            "max-w-[550px] h-[700px] bg-[#FFFFFF] p-10 rounded-lg w-full " +
            (tvLoading && " shimmer")
          }
        >
          <div className={"w-full " + (tvLoading && " hidden")}>
            <div className="flex gap-5">
              <div className="bg-[#646FC64D] rounded-full w-fit h-fit p-3">
                {/* {getIcon(title)} */}
                <GraduationCap color="#646FC6" />
              </div>
              <div className="flex flex-col justify-between gap-1">
                <div className="flex gap-2">
                  <h1 className="font-bold text-darkbackground text-xl">
                    {"Update TV Package"}
                  </h1>
                  <button onClick={() => tvRefetch()}>
                    <RefreshCcw />
                  </button>
                </div>
                <p className="text-textlight font-medium">
                  {"Modify selling prices for cable TV package"}
                </p>
              </div>
            </div>
            <form
              onSubmit={handleTvFormSumbit}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-3">
                <p className="mt-10">Select Package</p>
                <SelectPlan
                  loading={tvLoading || tvIsFetching || tvIsPending}
                  options={tvPackages || []}
                  selected={tvForm}
                  setSelected={setTvPackage}
                  placeholder="Please select Exam type"
                  name="tvPackage"
                />
              </div>
              <div className="flex flex-col bg-[#EEEEEE] h-fit p-5 rounded-lg">
                <p className="">Current Price</p>
                <p className="font-bold">
                  ₦{tvData && formatAmount(tvForm.tvPackage.sellingPrice || 0)}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="">New Selling Price (₦)</p>
                <input
                  value={tvForm.newSellingPrice}
                  name="newSellingPrice"
                  required={true}
                  onChange={(e) =>
                    setTvPackage((prev) => ({
                      ...prev,
                      newSellingPrice: e.target.value,
                    }))
                  }
                  type="text"
                  className="p-5 rounded-lg bg-[#EEEEEE]"
                  placeholder="Enter new price"
                />
              </div>
              <button
                disabled={TvSubmitting}
                // onClick={() => {
                //   console.log(tvForm);
                // }}
                className="bg-[#646FC6] flex justify-center gap-2 hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
              >
                <div
                  className={
                    "flex justify-center max-w-fit " +
                    (!TvSubmitting && " hidden")
                  }
                >
                  <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                Update Price
              </button>
            </form>
          </div>
        </div>
        {/*  */}
        <div className="max-w-[550px] bg-[#FFFFFF] p-10 rounded-lg w-full">
          <div className="flex gap-5">
            <div className="bg-[#646FC64D] rounded-full w-fit h-fit p-3">
              <GraduationCap color="#646FC6" />
            </div>
            <div className="flex flex-col justify-between gap-1">
              <h1 className="font-bold text-darkbackground text-xl w-full">
                Add TV Package
              </h1>
              <p className="text-textlight font-medium">
                Add a new cable TV subscription package
              </p>
            </div>
          </div>
          <form onSubmit={handleAddTvPackageFormSumbit} className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <p className="mt-10">TV Provider</p>
              <Select
                options={tvSubs}
                selected={addTvPackage}
                setSelected={setAddTvPackage}
                placeholder="Choose Network"
                name="network"
                withImage={false}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="">Package Name</p>
              <input
                value={addTvPackage.planName}
                name="planName"
                required={true}
                onChange={(e) =>
                  setAddTvPackage((prev) => ({
                    ...prev,
                    planName: e.target.value,
                  }))
                }
                type="text"
                className="p-5 rounded-lg bg-[#EEEEEE]"
                placeholder="Enter Plan Name"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="">Plan Code</p>
              <input
                value={addTvPackage.planCode}
                name="planCode"
                required={true}
                onChange={(e) =>
                  setAddTvPackage((prev) => ({
                    ...prev,
                    planCode: e.target.value,
                  }))
                }
                type="text"
                className="p-5 rounded-lg bg-[#EEEEEE]"
                placeholder="Enter Plan Code"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="">Cost Price (₦)</p>
              <input
                value={addTvPackage.costAmount}
                name="costAmount"
                required={true}
                onChange={(e) =>
                  setAddTvPackage((prev) => ({
                    ...prev,
                    costAmount: e.target.value,
                  }))
                }
                type="text"
                className="p-5 rounded-lg bg-[#EEEEEE]"
                placeholder="Enter cost amount"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="">New Selling Price (₦)</p>
              <input
                value={addTvPackage.sellingPrice}
                name="sellingPrice"
                required={true}
                onChange={(e) =>
                  setAddTvPackage((prev) => ({
                    ...prev,
                    sellingPrice: e.target.value,
                  }))
                }
                type="text"
                className="p-5 rounded-lg bg-[#EEEEEE]"
                placeholder="Enter selling price"
              />
            </div>
            <button
              disabled={addTvPackageLoading}
              
              className="bg-[#34C759] flex justify-center gap-2 hover:bg-[#34C759]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
            >
              <div
                className={
                  "flex justify-center max-w-fit " + (!addTvPackageLoading && " hidden")
                }
              >
                <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              Update Price
            </button>
          </form>
        </div>
        <div className="max-w-[550px] bg-[#FFFFFF] p-10 rounded-lg w-full">
          <div className="flex gap-5">
            <div className="bg-[#646FC64D] rounded-full w-fit h-fit p-3">
              <Database color="#646FC6" />
            </div>
            <div className="flex flex-col justify-between gap-1">
              <h1 className="font-bold text-darkbackground text-xl w-full">
                Sync Data Plans
              </h1>
              <p className="text-textlight font-medium">
                Synchronize all data plans from network providers
              </p>
            </div>
          </div>
          <div className="my-10 grid grid-cols-2 justify-between gap-5">
            <div className=" rounded-xl w-full max-w-[150px] p-5 h-full max-h-[300px] bg-[#E7E7EB] flex gap-2 justify-center items-start">
              <div className=" max-w-[20px] max-h-[20px] w-full h-full">
                <Image
                  priority={false}
                  src={"/mtn.png"}
                  alt="mtn icon"
                  width={20}
                  height={20}
                  className="object-contain rounded-lg shadow-md max-h-[80px] "
                />
              </div>
              <div className="">
                <h2 className="font-bold text-xl -leading-1">Mtn</h2>
                <p>{(syncData && syncData.totals.MTN) || 0}</p>
              </div>
            </div>
            <div className=" rounded-xl w-full max-w-[150px] p-5 h-full max-h-[300px] bg-[#E7E7EB] flex gap-2 justify-center items-start">
              <div className=" max-w-[20px] max-h-[20px] w-full h-full">
                <Image
                  priority={false}
                  src={"/airtel.png"}
                  alt="airtel icon"
                  width={20}
                  height={20}
                  className="object-contain rounded-lg shadow-md max-h-[80px] "
                />
              </div>
              <div className="">
                <h2 className="font-bold text-xl -leading-1">Airtel</h2>
                <p>{(syncData && syncData.totals.AIRTEL) || 0}</p>
              </div>
            </div>
            <div className=" rounded-xl w-full max-w-[150px] p-5 h-full max-h-[300px] bg-[#E7E7EB] flex gap-2 justify-center items-start">
              <div className=" max-w-[20px] max-h-[20px] w-full h-full">
                <Image
                  priority={false}
                  src={"/glo.png"}
                  alt="glo icon"
                  width={20}
                  height={20}
                  className="object-contain rounded-lg shadow-md max-h-[80px] "
                />
              </div>
              <div className="">
                <h2 className="font-bold text-xl -leading-1">Glo</h2>
                <p>{(syncData && syncData.totals.GLO) || 0}</p>
              </div>
            </div>
            <div className=" rounded-xl w-full max-w-[150px] p-5 h-full max-h-[300px] bg-[#E7E7EB] flex gap-2 justify-center items-start">
              <div className=" max-w-[20px] max-h-[20px] w-full h-full">
                <Image
                  priority={false}
                  src={"/9mobile.png"}
                  alt="9mobile icon"
                  width={20}
                  height={20}
                  className="object-contain rounded-lg shadow-md max-h-[80px] "
                />
              </div>
              <div className="">
                <h2 className="font-bold text-xl -leading-1">9mobile</h2>
                <p>{(syncData && syncData.totals["9MOBILE"]) || 0}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              {/* <p className="">New Selling Price (₦)</p> */}
              <input
                value={
                  "Total Plans: " +
                  (syncData
                    ? syncData.totals.GLO +
                      syncData.totals.MTN +
                      syncData.totals.AIRTEL +
                      syncData.totals["9MOBILE"]
                    : 0)
                }
                name="meterNum"
                required={true}
                onChange={(e) => {}}
                readOnly
                type="text"
                className="p-5 rounded-lg bg-[#EEEEEE]"
                placeholder="Enter meter number"
              />
            </div>
            <button
              onClick={async () => {
                syncRefetch();
              }}
              disabled={syncLoading || syncIsPending || syncIsFetching}
              className="bg-[#34C759] flex justify-center gap-2 hover:bg-[#34C759]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
            >
              <div
                className={
                  "flex justify-center max-w-fit " +
                  (!(syncLoading || syncIsPending || syncIsFetching) &&
                    " hidden")
                }
              >
                <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              Sync All Data Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
