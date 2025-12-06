import { NextResponse } from "next/server";
import api from "@/app/lib/axiosInstance";
import { isAxiosError } from "axios";
import { numRegex } from "@/app/constants/constant";

export async function GET(
  req: Request,
  context: { params: Promise<{ cable: string }> }
) {
  try {
    const { cable } = await context.params;
    console.log(cable);

    const res = await api.get("TvSubscription/variations/" + cable);

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
    if (!body.cableType?.trim()) {
      return NextResponse.json(
        {
          error: "select a cable",
        },
        { status: 400 }
      );
    } else if (!body.package || Object.keys(body.package).length < 1) {
      return NextResponse.json(
        { error: "please select a package" },
        { status: 400 }
      );
    }else if (
      !body.serialNo ||
      isNaN(parseInt(body.serialNo)) ||
      !numRegex.test(body.serialNo)
    ) {
      return NextResponse.json(
        { error: "please enter a valid serial number" },
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
      service: body.cableType,
      Vcode: body.package?.planCode,
      AccountNo: body.phone,
      usePoints:body.isChecked,
      amount:body.package.amount
    };
    console.log(new_body);
    const data = await api.post("TvSubscription/purchase", new_body);
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