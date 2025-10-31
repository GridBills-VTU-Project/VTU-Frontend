import { NextResponse } from "next/server";
import api from "@/app/lib/axiosInstance";
import { isAxiosError } from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.phone?.trim()) {
      return NextResponse.json(
        { error: "Email or number must be valid." },
        { status: 400 }
      );
    } else if (!body.password?.trim()) {
      return NextResponse.json(
        { error: "Please enter your password." },
        { status: 400 }
      );
    }
    const new_body = {
      emailOrPhone: body.phone.trim(),
      password: body.password.trim(),
    };
    console.log(new_body);

    const data = await api.post("Auth/login", new_body);
    console.log(data.data, data.status);

    const res = NextResponse.json({ msg: "Success." }, { status: 200 });
    if (data.data.user.token) {
      res.cookies.set("token", data.data.user.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      
    }
    return res;
  } catch (err) {
    console.error(err);
    
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
