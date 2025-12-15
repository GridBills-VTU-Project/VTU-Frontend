import { numRegex } from "@/app/constants/constant";
import api from "@/app/lib/axiosInstance";
import { isValidPassword } from "@/app/util/functions";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import validator from "validator";

export async function GET(req: Request) {
  try {
    const data = await api.get("auth/user-details");
    console.log(data.data, data.status);
    return NextResponse.json({ ...data.data }, { status: 200 });
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status == 401) {
        return NextResponse.json(
          { error: "Session expired, Please login" },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: err.response?.data?.ret_msg || err.response?.statusText },
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
    if (!body.name.trim()) {
      return NextResponse.json(
        { error: "Please enter full name." },
        { status: 400 }
      );
    } else if (!validator.isEmail(body.email)) {
      return NextResponse.json(
        { error: "Email must be a valid email." },
        { status: 400 }
      );
    } else if (!body.address.trim()) {
      return NextResponse.json(
        {
          error: "Please enter Address.",
        },
        { status: 400 }
      );
    } else if (!body.bank.trim()) {
      return NextResponse.json(
        {
          error: "Please enter Bank Number.",
        },
        { status: 400 }
      );
    } else if (!body.account || !numRegex.test(body.account) ) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid account number.",
        },
        { status: 400 }
      );
    }
    const new_body = {
      fullName: body.name.replace(" ","_"),
      email: body.email.trim(),
      bankName: body.bank.trim(),
      accountNumber: body.account.trim(),
      address: body.address.trim(),
      UserId:"string"
    };
    console.log(new_body);

    const data = await api.post("Agent/register-agent", new_body);
    console.log(data.data, data.status);

    return NextResponse.json(
      { msg: "Request Under Approval." },
      { status: 200 }
    );
  } catch (err) {
    
    if (isAxiosError(err)) {
      console.log(err.response);
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
