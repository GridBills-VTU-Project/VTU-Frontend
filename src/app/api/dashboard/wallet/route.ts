import { NextResponse } from "next/server";
import api from "@/app/lib/axiosInstance";
import { AxiosResponse, isAxiosError } from "axios";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const res = await api.get("Wallet/dashboard");

    if (res.data) {
      let data = res.data;
      return NextResponse.json({ ...data }, { status: 200 });
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
    const body = await req.json();
    if (
      !body.amount?.trim() ||
      isNaN(parseFloat(body.amount)) ||
      parseFloat(body.amount) <= 0 ||
      !body.type
    ) {
      return NextResponse.json(
        {
          error: "please enter a valid amount",
        },
        { status: 400 }
      );
    }

    const new_body = {
      amount: body.amount.trim(),
    };
    console.log(new_body);
    let data: AxiosResponse<any, any>;
    if (body.type === "fund") {
      data = await api.post("Wallet/fund", new_body);
    } else {
      data = await api.post("Wallet/borrow", new_body);
    }
    console.log(data.data, data.status);

    return NextResponse.json({ ...data.data.data }, { status: 200 });
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
        { error: err.response?.data.ret_msg || "Failed"},
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
