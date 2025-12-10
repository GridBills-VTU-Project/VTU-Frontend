import { amounts, networks, numRegex, serviceTypes } from "@/app/constants/constant";
import api from "@/app/lib/axiosInstance";
import { AxiosResponse, isAxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.network?.trim() || !networks.includes(body.network)) {
      return NextResponse.json(
        {
          error: "please select a valid network",
        },
        { status: 400 }
      );
    } else if (
      !body.quantity ||
      !numRegex.test(body.quantity)
    ) {
      return NextResponse.json(
        {
          error: "Quantity Invalid",
        },
        { status: 400 }
      );
    } else if (
      !body.amount ||
      !numRegex.test(body.amount) ||
      !amounts.includes(body.amount)
    ) {
      return NextResponse.json(
        {
          error: "please Select a valid amount",
        },
        { status: 400 }
      );
    } else if (
      !body.total ||
      !numRegex.test(body.total) ||
      parseInt(body.total) == 0
    ) {
      return NextResponse.json(
        {
          error: "please enter a valid amount",
        },
        { status: 400 }
      );
    } else if ( typeof body.isChecked != "boolean") {
      return NextResponse.json(
        {
          error: "please select whether or not to use points",
        },
        { status: 400 }
      );
    }

    const new_body = {
      amount: body.amount.trim(),
      network:body.network,
      pinDenomination: parseInt(body.amount)/100,
      pinQuantity: body.quantity,
      usePoints:body.isChecked
    };
    console.log(new_body);
    let res: AxiosResponse<any, any>;

    res = await api.post("Data/purchasePin", new_body);

    console.log(res.data, res.status);

    return NextResponse.json({msg:res.data.message, response:res.data.pinList,batchNo:res.data.batchNo }, { status: 200 });
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err.response);
      if (err.response?.status == 401) {
        return NextResponse.json(
          { error: "Session expired, Please login" },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: err.response?.data.ret_msg || "Failed" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}