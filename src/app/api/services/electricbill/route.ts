import { ElectricityPurchaseForm } from "@/app/util/types";
import { meterTypes, numRegex, serviceTypes } from "@/app/constants/constant";
import api from "@/app/lib/axiosInstance";
import { AxiosResponse, isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body: ElectricityPurchaseForm = await req.json();
    console.log(isNaN(parseInt(body.amount)));
    console.log(parseInt(body.amount));

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
      !numRegex.test(body.amount) ||
      parseFloat(body.amount) < 10
    ) {
      return NextResponse.json(
        {
          error: "please enter a valid amount",
        },
        { status: 400 }
      );
    } else if (!body.phone || !numRegex.test(body.phone)) {
      return NextResponse.json(
        {
          error: "please enter a valid phone number",
        },
        { status: 400 }
      );
    } else if (typeof body.isChecked != "boolean") {
      return NextResponse.json(
        {
          error: "please select whether or not to use points",
        },
        { status: 400 }
      );
    }

    const new_body = {
      amount: parseInt(body.amount.trim(),10),
      serviceId: body.servicID,
      meterNumber: body.meterNum,
      meterType: body.meterType,
      phone: body.phone.startsWith("0")? parseInt(body.phone.substring(1),10) : parseInt( body.phone,10),
      provider: "epins",
      reference: "electricity purchase"+Date.now(),
      usePoints: body.isChecked,
    };
    console.log(new_body);
    let res: AxiosResponse<any, any>;
    const cookieStore = await cookies();
    const role = cookieStore.get("role")?.value;
    if (!role) {
      return NextResponse.json(
        { error: "Session expired, Please login" },
        { status: 401 }
      );
    }
    if (role == "Agent") {
      res = await api.post("Agent/sell-electricity", new_body);
    } else {
      res = await api.post("Electricity/purchase", new_body);
    }

    console.log("jiyy", res);

    return NextResponse.json(
      { msg: res.data.message, token: res.data.token },
      { status: 200 }
    );
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
        { error: err.response?.data.message || "Failed,Please try again later." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

//validate
export async function PATCH(req: Request) {
  try {
    const body = await req.json();

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
    }

    const new_body = {
      serviceId: body.servicID,
      meterNumber: body.meterNum,
      meterType: body.meterType,
      provider: "epins",
    };
    console.log(new_body);
    let res: AxiosResponse<any, any>;

    res = await api.post("Electricity/validate", new_body);

    console.log(res.data, res.status);
    if (res.data?.code == 200) {
      return NextResponse.json(
        { error: "Invalid Meter Number" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(res.data, { status: 200 });
    }
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
