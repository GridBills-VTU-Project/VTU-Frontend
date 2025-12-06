import { NextResponse } from "next/server";
import api from "@/app/lib/axiosInstance";
import { isAxiosError } from "axios";
import { numRegex } from "@/app/constants/constant";
export async function GET(
  req: Request,
  context: { params: Promise<{ data: string }> }
) {
  try {
    const { data } = await context.params;
    console.log(data);

    const res = await api.get("Data/plans?networkId=0" + data);

    if (res.data) {
      let data = res.data;
      return NextResponse.json([...data], { status: 200 });
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
    if (!body.network?.trim()) {
      return NextResponse.json(
        {
          error: "select a network",
        },
        { status: 400 }
      );
    } else if (
      !body.phone ||
      isNaN(parseInt(body.phone)) ||
      !numRegex.test(body.phone) ||
      body.phone.length < 9
    ) {
      return NextResponse.json(
        { error: "please enter a valid phone number" },
        { status: 400 }
      );
    } else if (!body.data || Object.keys(body.data).length < 1) {
      return NextResponse.json(
        { error: "please select a data plan" },
        { status: 400 }
      );
    }

    const new_body = {
      dataPlanName: body.data?.name,
      network: body.data?.network,
      phoneNumber: body.phone,
    };
    console.log(new_body);
    // let data: AxiosResponse<any, any>;
    const data = await api.post("Data/buyData", new_body);
    console.log(data.data, data.status);

    return NextResponse.json({ ...data.data.data }, { status: 200 });
  } catch (err) {
    // console.log("ooo",err);

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
    console.log(body);

    if (!body.network?.trim()) {
      return NextResponse.json(
        {
          error: "select a network",
        },
        { status: 400 }
      );
    } else if (
      !body.phone ||
      isNaN(parseInt(body.phone)) ||
      !numRegex.test(body.phone) ||
      body.phone.length < 9
    ) {
      return NextResponse.json(
        { error: "please enter a valid phone number" },
        { status: 400 }
      );
    } else if (
      !body.amount ||
      !numRegex.test(body.amount) ||
      parseInt(body.amount) < 20
    ) {
      return NextResponse.json(
        { error: "Amount must be a valid number." },
        { status: 400 }
      );
    }

    const new_body = {
      network: body?.network,
      phoneNumber: body?.phone,
      amount: body?.amount,
      reference: "airtime",
    };
    const data = await api.post("Data/buyAirtime", new_body);
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
