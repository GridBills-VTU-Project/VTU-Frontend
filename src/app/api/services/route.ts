import { NextResponse } from "next/server";
import api from "@/app/lib/axiosInstance";
import { AxiosResponse, isAxiosError } from "axios";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const res = await api.get("ExamPin/exam-packages");

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
          { status: 401 },
        );
      }
      return NextResponse.json(
        { error: err.response?.data?.ret_msg },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (!body.examType || Object.keys(body.examType).length <= 0) {
      return NextResponse.json(
        {
          error: "please select a valid exam type",
        },
        { status: 400 },
      );
    } else if (typeof body.isChecked != "boolean") {
      return NextResponse.json(
        {
          error: "please select whether or not to use points",
        },
        { status: 400 },
      );
    }

    const new_body = {
      service: body.examType?.planCode,
      usePoints: body.isChecked,
      quantity: 1,
    };
    console.log(new_body);
    let res: AxiosResponse<any, any>;
    const cookieStore = await cookies();
    const role = cookieStore.get("role")?.value;
    if (!role) {
      return NextResponse.json(
        { error: "Session expired, Please login" },
        { status: 401 },
      );
    }
    if (role == "Agent") {
      res = await api.post("Agent/sell-exam-pin", new_body);
    } else {
      res = await api.post("ExamPin/buy-exam-pin", new_body);
    }

    // console.log(res.data, res.status);
    //     const data = {
    //   "code": 200,
    //   "description": {
    //     "ret_msg": "Exam Pin purchased successfully",
    //     "token": "PIN:904014975838",
    //     "Serial":"NER100039846",
    //     "ref": "9a273de3cfa4",
    //     "amount": 1000,
    //     "amount_Paid": 0,
    //     "transaction_Date": "February 28, 2026  13:02:08:18pm"
    //   }
    // };
    const data = res.data;
console.log(res.data,res.status);

    return NextResponse.json(
      {
        msg: data.description.ret_msg || "Exam pin purchased successfully",
        token: data.description.token,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);

    if (isAxiosError(err)) {
      console.error(err.response);
      if (err.response?.status == 401) {
        return NextResponse.json(
          { error: "Session expired, Please login" },
          { status: 401 },
        );
      }
      return NextResponse.json(
        {
          error: err.response?.data.message || "Failed,Please try again later.",
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
