import { NextResponse } from "next/server";
import api from "@/app/lib/axiosInstance";
import { isAxiosError } from "axios";
import { isValidPassword } from "@/app/util/functions";
import validator from "validator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.first_name.trim()) {
      return NextResponse.json(
        { error: "Please enter first name." },
        { status: 400 }
      );
    } else if (!body.last_name.trim()) {
      return NextResponse.json(
        {
          error: "Please enter last name.",
        },
        { status: 400 }
      );
    } else if (!isValidPassword(body.password)) {
      return NextResponse.json(
        {
          error:
            "password must be at least 6 characters long, containing at least 1 upper case character, 1 special character and 1 number",
        },
        { status: 400 }
      );
    } else if (!validator.isEmail(body.email))
      return NextResponse.json(
        { error: "Email must be a valid email." },
        { status: 400 }
      );
    const new_body = {
      fullName: body.first_name.trim() +"_"+ body.last_name.trim(),
      email: body.email.trim(),
      password: body.password.trim(),
      phoneNumber:body.phone.trim(),
    };
    console.log(new_body);
    
    const data = await api.post("Auth/register",new_body);
    console.log(data.data,data.status);
    

    return NextResponse.json({msg:"Please verify your account using the OTP sent to your email."}, { status: 200 });
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
