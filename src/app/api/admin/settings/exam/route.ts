import { numRegex } from "@/app/constants/constant";
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
    const res = await api.get("Admin/exam-pin/packages");
    if (res.data) {
      let data = res.data;
      return NextResponse.json([...data ], { status: 200 });
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
    if (!body.examPackage || Object.keys(body.examPackage).length === 0) {
      return NextResponse.json(
        {
          error: "select an exam package.",
        },
        { status: 400 }
      );
    } else if (
      !body.newPrice ||
      isNaN(parseInt(body.newPrice)) ||
      !numRegex.test(body.newPrice)
    ) {
      return NextResponse.json(
        { error: "please enter a valid new Price." },
        { status: 400 }
      );
    }
    const newBody ={
        plan:body.examPackage.plan,
        sellingPrice:parseInt(body.newPrice,10)
    }
    const res = await api.put("Admin/update-exampinprice",newBody);
    console.log(res.data);
    
    if (res.data) {
      return NextResponse.json({msg:res.data.message || "Success"}, { status: 200 });
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