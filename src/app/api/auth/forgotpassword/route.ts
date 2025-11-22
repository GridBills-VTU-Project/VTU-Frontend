import { NextResponse } from "next/server";
import api from "@/app/lib/axiosInstance";
import { isAxiosError } from "axios";
import validator from "validator";
import { isValidPassword } from "@/app/util/functions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.email?.trim()) {
      return NextResponse.json(
        { error: "Email must be valid." },
        { status: 400 }
      );
    }
    const new_body = {
      email: body.email.trim(),
    };
    console.log(new_body);

    const data = await api.post("Auth/forgot-password", new_body);
    console.log(data.data, data.status);

    const res = NextResponse.json(
      {
        msg: data.data.message || "Otp sent successfully.",
      },
      { status: 200 }
    );
    return res;
  } catch (err) {
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
    }else if(!body.otp || isNaN(parseInt(body.otp)) || !body.password || !isValidPassword(body.password)){
      return NextResponse.json(
        { error: "Otp and password must be valid." },
        { status: 400 }
      );
    }
    const new_body = {
      email: body.email.trim(),
      otp:body.otp.trim(),
      newPassword:body.password.trim()
    };
    console.log(new_body);

    const data = await api.post("Auth/reset-password", new_body);
    console.log(data.data, data.status);

    return NextResponse.json(
      { msg: "Password reset successful" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    
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