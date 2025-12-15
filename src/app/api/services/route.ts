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

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (!body.examType || Object.keys(body.examType).length <= 0) {
      return NextResponse.json(
        {
          error: "please select a valid exam type",
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
      service: body.examType?.planCode,
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
      res = await api.post("Agent/sell-exam-pin", new_body);
    } else {
      res = await api.post("ExamPin/buy-exam-pin", new_body);
    }

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
        { error: err.response?.data.ret_msg || "Failed,Please try again later." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
