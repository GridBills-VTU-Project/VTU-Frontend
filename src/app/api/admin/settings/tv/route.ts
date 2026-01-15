import { numRegex, tvSubs } from "@/app/constants/constant";
import api from "@/app/lib/axiosInstance";
import { isAxiosError } from "axios";
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
    const res = await api.get("Admin/tv/packages");
    if (res.data) {
      let data = res.data;
      return NextResponse.json([...data], { status: 200 });
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
    const cookieStore = await cookies();
    const role = cookieStore.get("role")?.value;
    const body = await req.json();
    if (!role) {
      return NextResponse.json(
        { error: "Session expired, Please login." },
        { status: 401 }
      );
    }
    if (role != "Admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }
    if (!body.network || !tvSubs.includes(body.network)) {
      return NextResponse.json(
        { error: "please select a valid tv provider." },
        { status: 400 }
      );
    } else if (!body.planName) {
      return NextResponse.json(
        { error: "please add a plan name." },
        { status: 400 }
      );
    } else if (!body.planCode) {
      return NextResponse.json(
        { error: "please add a plan name." },
        { status: 400 }
      );
    } else if (!body.costAmount || !numRegex.test(body.costAmount)) {
      return NextResponse.json(
        { error: "please enter a valid cost amount." },
        { status: 400 }
      );
    } else if (!body.sellingPrice || !numRegex.test(body.sellingPrice)) {
      return NextResponse.json(
        { error: "please enter a valid selling price." },
        { status: 400 }
      );
    }
    const newBody = {
      plan: body.planName.toLocaleLowerCase(),
      planCode:body.planCode,
      network: body.network,
      amount: parseInt(body.costAmount, 10),
      sellingPrice: parseInt(body.sellingPrice, 10),
    };
    const res = await api.post("Admin/tv/add-package", newBody);
    console.log(res.data);

    if (res.data) {
      return NextResponse.json(
        { msg: res.data.ret_msg || "Success" },
        { status: 200 }
      );
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
