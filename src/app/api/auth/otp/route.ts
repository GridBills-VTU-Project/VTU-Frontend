import { NextResponse } from "next/server";
import api from "@/app/lib/axiosInstance";
import { isAxiosError } from "axios";
import validator from "validator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.otp.trim()) {
      return NextResponse.json(
        {
          error: "please enter otp",
        },
        { status: 400 }
      );
    } else if (!validator.isEmail(body.email)) {
      return NextResponse.json(
        { error: "Email must be a valid email." },
        { status: 400 }
      );
    }

    const new_body = {
      otpCode: body.otp.trim(),
      email: body.email.trim(),
    };
    console.log(new_body);

    const data = await api.post("Auth/verify-otp", new_body);
    console.log(data.data, data.status);

    return NextResponse.json({ msg: "Success, Please login" }, { status: 200 });
  } catch (err: any) {
    if (isAxiosError(err)) {
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
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!validator.isEmail(body.email)) {
      return NextResponse.json(
        { error: "Email must be a valid email." },
        { status: 400 }
      );
    }
    const new_body = {
      email: body.email.trim(),
    };
    console.log(new_body);

    const data = await api.post("Auth/resend-otp", new_body);
    console.log(data.data, data.status);

    return NextResponse.json(
      { msg: "Success, OTP sent." },
      { status: 200 }
    );
  } catch (err: any) {
    if (isAxiosError(err)) {
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
