import Select from "@/app/components/ui/Select";
import {
  amounts,
  CardPinTransactions,
  networks,
  numRegex,
} from "@/app/constants/constant";
import UseAxios from "@/app/customHooks/UseAxios";
import UseRole from "@/app/customHooks/UseRole";
import { handleCopy } from "@/app/util/functions";
import { CardPin } from "@/app/util/types";
import { isAxiosError } from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Copy, Download, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const CardPinForm = () => {
  const api = UseAxios();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    total: 0,
    network: "MTN",
    amount: "",
    quantity: "",
    isChecked: false,
  });
  const isAgent = UseRole(["agent"]);
  const [batchNo, setBatchNo] = useState<string | null>(null);
  const [cardPinsRes, setCardPinsRes] = useState<CardPin[] | null>(null);
  const [batchSearch, setBatchSearch] = useState("");

  useEffect(() => {
    if (
      form.amount != "" &&
      numRegex.test(form.amount) &&
      form.quantity != "" &&
      numRegex.test(form.quantity)
    ) {
      setForm((prev) => ({
        ...prev,
        total: parseInt(form.amount) * parseInt(form.quantity),
      }));
    }
  }, [form.amount, form.quantity]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(form);
      if (!form.network?.trim() || !networks.includes(form.network)) {
        return toast.info("Select a valid network.");
      } else if (!form.amount || !numRegex.test(form.amount)) {
        return toast.info("Select a valid amount.");
      } else if (!form.quantity || !numRegex.test(form.quantity)) {
        return toast.info("Quantity must be a number.");
      } else if (!form.total || !numRegex.test(form.total.toString())) {
        return toast.info("Total must be number.");
      }
      const res = await api.post("services/cardpin", JSON.stringify(form));
      toast.success(res.data.msg || "Success.");
      setBatchNo(res.data?.batchNo);
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

  const handleSearch = async (search: string) => {
    try {
      console.log(form);

      const res = await api.get("services/cardpin/" + search);
      toast.success(res.data.msg || "Success.");
      setCardPinsRes(res.data?.pins);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        return;
      }
      toast.error("something went wrong.");
    }
  };

  const handleDownload = (cardPins: CardPin[]) => {
    downloadPDF("CardPin" + batchSearch + ".pdf", cardPins);
  };

  function downloadPDF(filename: string, report: CardPin[]) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Card Pin Report", 14, 15);

    const tableData = report.map((item) => [item.pin, item.serial, item.date,item.dial,item.amount]);

    autoTable(doc, {
      head: [["Pin", "Serial Number", "Date","Code","Amount"]],
      body: tableData,
      startY: 25,
    });

    doc.save(filename);
  }

  return (
    <>
      <div className="flex flex-col rounded-lg w-full mt-10">
        <h2 className="capitalize font-bold text-3xl  text-[#163145] ">
          Airtime E-SIM
        </h2>
        <p className="text-[#7D7979]">
          Purchase airtime codes in bulk for all networks
        </p>
        <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10">
          <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
            How It Works
          </h3>
          <p className="text-[#7D7979]">
            Simple steps to purchase airtime codes
          </p>
          <div className="flex flex-col gap-5 mt-4">
            <div className="flex gap-3 items-center">
              <div className="bg-[#7D7979]/30 rounded-full px-2 h-fit w-fit">
                1
              </div>
              <div>
                <h3 className="text-[#163145] capitalize font-bold">
                  select network
                </h3>
                <p className="text-[#7D7979]">
                  Choose your preferred network provider
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="bg-[#7D7979]/30 rounded-full px-2 h-fit w-fit">
                2
              </div>
              <div>
                <h3 className="text-[#163145] capitalize font-bold">
                  Choose Amount
                </h3>
                <p className="text-[#7D7979]">
                  Select the airtime denomination
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="bg-[#7D7979]/30 rounded-full px-2 h-fit w-fit">
                3
              </div>
              <div>
                <h3 className="text-[#163145] capitalize font-bold">
                  Enter Quantity
                </h3>
                <p className="text-[#7D7979]">
                  Specify how many codes you need (up to 100)
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="bg-[#7D7979]/30 rounded-full px-2 h-fit w-fit">
                4
              </div>
              <div>
                <h3 className="text-[#163145] capitalize font-bold">
                  Get the Batch number
                </h3>
                <p className="text-[#7D7979]">
                  Receive unique batch number to retrive codes.
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="bg-[#7D7979]/30 rounded-full px-2 h-fit w-fit">
                5
              </div>
              <div>
                <h3 className="text-[#163145] capitalize font-bold">
                  Get Your Codes
                </h3>
                <p className="text-[#7D7979]">
                  Receive unique airtime codes instantly
                </p>
              </div>
            </div>
          </div>
        </div>
        <form id="purchaseForm" onSubmit={submit} className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl px-5 py-10">
          <h3 className="capitalize font-bold text-3xl text-[#163145] ">
            Purchase Details
          </h3>
          <p className="text-[#7D7979]">
            Select network and amount to generate airtime codes
          </p>
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
              <p className="mt-10">Select Amount</p>
              <Select
                options={amounts}
                selected={form}
                setSelected={setForm}
                placeholder="Choose Amount"
                name="amount"
                withImage={false}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="mt-10">Quantity</p>
              <input
                value={form.quantity}
                name="quantity"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, quantity: e.target.value }))
                }
                type="text"
                className="p-5 rounded-lg bg-[#EEEEEE]"
                placeholder="Enter quantity number"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="mt-10">Total</p>
              <input
                value={"₦" + form.total}
                name="quantity"
                required={true}
                disabled={true}
                type="text"
                className="p-5 rounded-lg bg-[#EEEEEE]"
                placeholder="Enter quantity number"
                readOnly={true}
              />
            </div>
            {/* <div className="flex flex-col gap-3">
              <p className="mt-10">Batch ID</p>
              <div className="w-full">
                <input
                  value={form.batch}
                  name="batch"
                  required={true}
                  type="text"
                  className="p-5 rounded-lg bg-[#EEEEEE] w-full"
                  placeholder="e.g 1"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, batch: e.target.value }))
                  }
                />
                <p className="text-red-600 text-xs italic">
                  Must be unique and please remember
                </p>
              </div>
            </div> */}

            {isAgent && <div className="flex items-center w-fit gap-3">
              <input
                name="ischecked"
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, isChecked: e.target.checked }));
                }}
                type="checkbox"
                className="accent-darkbackground"
              />
              <p className="">Use Points</p>
            </div>}
          </div>
        </form>
        <button
        type="submit"
        form="purchaseForm"
          disabled={loading}
          className="bg-[#646FC6] flex justify-center gap-1 hover:bg-[#646FC6]/90 w-full text-[#ffff] mt-5 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer "
        ><div className={"flex justify-center max-w-fit " + (!loading && " hidden")}>
            <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          Proceed to Payment
        </button>
      </div>
      <div className="bg-[#FFFFFF] mt-20 border-2 border-[#AAAAAA] rounded-xl p-4 pb-10 h-[800px] w-full">
        <div className="flex flex-col mb-10 gap-3">
          <div className="flex justify-between">
            <div>
              <h3 className="capitalize font-bold text-3xl  text-[#163145] ">
                Generated Airtime Codes
              </h3>
            </div>
            <button
            className={"bg-[#646FC6] p-2 rounded-lg max-h-fit " + (cardPinsRes==null && " bg-[#646fc6]/30 hover:!cursor-not-allowed")}
              disabled={cardPinsRes == null}
              onClick={() => {
                if (cardPinsRes != null){
                  handleDownload(cardPinsRes)
                }else{
                  ()=>{}
                }
              
              }}
            >
              <Download color="white"/>
            </button>
          </div>
          <div className="flex items-center w-full">
            <input
              name="batch number"
              onChange={(e) => setBatchSearch(e.target.value)}
              type="search"
              className="p-2 rounded-l-lg bg-[#EEEEEE] outline-[#646FC6] text-sm max-sm:text-[16px] w-full"
              placeholder="Enter batch number"
            />
            <button
            className={"bg-[#646FC6] p-2 rounded-r-lg " + (batchSearch=="" && " bg-[#646fc6]/30 hover:!cursor-not-allowed")}
              disabled={batchSearch == ""}
              onClick={() => handleSearch(batchSearch)}
            >
              <Search color="white"/>
            </button>
          </div>
        </div>
        <div
          className={
            "h-[90%] overflow-auto flex justify-center items-center w-full " +
            (false && " shimmer")
          }
        >
          {cardPinsRes && cardPinsRes.length > 0 ? (
            <ul
              className={
                "h-full flex flex-col gap-10 w-full  " + (false && " hidden")
              }
            >
              {cardPinsRes.map((trans: CardPin, index: number) => (
                <li
                  key={index}
                  className="bg-[#AAAAAA33] flex p-5 justify-between rounded-xl text-end items-center"
                >
                  <div className="flex gap-5 items-center max-w-[60%]">
                    <div className="flex-2 truncate text-start">
                      <h4 className="capitalize font-bold text-sm truncate ">
                        Card pin
                      </h4>
                      <p className="text-[#757575] text-sm">{trans.pin}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h5 className="font-medium text-sm">{trans.network}</h5>
                      <p className="text-[#757575] text-sm line-clamp-1">{trans.date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={" " + (false && " hidden")}> No Card Pins</p>
          )}
        </div>
      </div>
      {batchNo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="flex flex-col w-fit py-5 px-10 justify-center items-center bg-neutral-100 rounded-lg shadow-2xl relative">
            <button
              onClick={() => setBatchNo(null)}
              className="absolute top-2 right-2 bg-[#FF3B30] p-1 rounded-sm text-white"
            >
              <X width={20} height={20} />
            </button>

            <div className="flex flex-col gap-2 mb-2 mt-6">
              <h3 className="text-xl font-semibold text-main-heading">
                Batch No.
              </h3>
              <p className="flex items-center gap-3">
                {batchNo}
                <button
                  type="button"
                  onClick={() => handleCopy(batchNo)}
                  className="px-2 border-2 rounded-lg border-primary text-primary max-w-fit"
                >
                  <Copy strokeWidth={1} width={15} />
                </button>
              </p>
            </div>

            {/* <button
              disabled={!false}
              className="bg-[#FF3B30] text-white py-2 px-4 rounded-xl"
            >
              Delete
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default CardPinForm;
