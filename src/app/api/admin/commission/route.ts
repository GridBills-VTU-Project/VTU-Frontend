import { numRegex, numRegexWithDecimal } from "@/app/constants/constant";
import api from "@/app/lib/axiosInstance";
import { AxiosResponse, isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get("role")?.value;
    if (!role) {
      return NextResponse.json(
        { error: "Session expired, Please login" },
        { status: 401 }
      );
    }
    if (role != "Admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }
    const res = await api.get("Admin/commission-dashboard");
    if (res.data) {
      let data = res.data;
      return NextResponse.json({ ...data }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Failed,Please try again later." },
        { status: 400 }
      );
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
      !body.commissionRate?.trim() ||
      isNaN(parseFloat(body.commissionRate)) ||
      parseFloat(body.commissionRate) <= 0 ||
      !numRegexWithDecimal.test(body.commissionRate)
    ) {
      return NextResponse.json(
        {
          error: "please enter a valid commission rate",
        },
        { status: 400 }
      );
    }

    const new_body = {
      // serviceType: "string",
      // isPercentage: true,
      newRate: body.commissionRate.trim(),
    };
    console.log(new_body);
    let data: AxiosResponse<any, any>;
    const cookieStore = await cookies();
    const role = cookieStore.get("role")?.value;
    if (!role) {
      return NextResponse.json(
        { error: "Session expired, Please login" },
        { status: 401 }
      );
    }
    if (role != "Admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }
    data = await api.put("Admin/rate", new_body);
    console.log(data, data.status);

    return NextResponse.json({ msg:data.data.message }, { status: 200 });
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
        {
          error: err.response?.data.ret_msg || "Failed,Please try again later.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
