import { NextResponse } from "next/server";
import api from "@/app/lib/axiosInstance";
import { AxiosResponse, isAxiosError } from "axios";
import { ElectricityPurchaseForm } from "@/app/util/types";
import { meterTypes, numRegex, serviceTypes } from "@/app/constants/constant";

export async function GET(req: Request) {
  try {
    const res = await api.get("ExamPin/exam-packages");

    if (res.data) {
      let data = res.data;
      return NextResponse.json([ ...data ], { status: 200 });
    } else {
      return NextResponse.json({ error: "Failed" }, { status: 400 });
    }
  } catch (err) {
    console.error(err);
    if (isAxiosError(err)) {
      console.error(err.response);
      if (err.response?.status == 401) {
        return NextResponse.json(
          { error: "Session expired, Please login" },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: err.response?.data?.ret_msg },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body: ElectricityPurchaseForm = await req.json();
    console.log(isNaN(parseInt(body.amount)))
    console.log(parseInt(body.amount))
    
    if (!body.meterType?.trim() || !meterTypes.includes(body.meterType)) {
      return NextResponse.json(
        {
          error: "please enter a valid meter type",
        },
        { status: 400 }
      );
    } else if (
      !body.meterNum?.trim() ||
      !numRegex.test(body.meterNum) ||
      body.meterNum.length < 9
    ) {
      return NextResponse.json(
        {
          error: "please enter a valid meter number",
        },
        { status: 400 }
      );
    } else if (
      !body.servicID?.trim() ||
      !serviceTypes.includes(body.servicID)
    ) {
      return NextResponse.json(
        {
          error: "please enter a valid amount",
        },
        { status: 400 }
      );
    } else if (
      !body.amount ||
      !numRegex.test(body.amount)||
      parseFloat(body.amount) < 10
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
      serviceId: body.servicID,
      meterNumber: body.meterNum,
      meterType: body.meterType,
      provider: "epins",
      reference: "electricity purchase",
      usePoints:body.isChecked
    };
    console.log(new_body);
    let res: AxiosResponse<any, any>;

    res = await api.post("Electricity/purchase", new_body);

    console.log(res.data, res.status);

    return NextResponse.json({msg:res.data.ret_msg, response:res.data.response }, { status: 200 });
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
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.examType || Object.keys(body.examType).length <= 0 ) {
      return NextResponse.json(
        {
          error: "please select a valid exam type",
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
      service: body.examType?.planCode,
      usePoints: body.isChecked,
    };
    console.log(new_body);
    let res: AxiosResponse<any, any>;

    res = await api.post("ExamPin/buy-exam-pin", new_body);

    console.log(res.data, res.status);

    return NextResponse.json({ ...res.data.data }, { status: 200 });
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
