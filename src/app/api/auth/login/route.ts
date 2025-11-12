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

    const res = NextResponse.json(
      {
        msg: "Success.",
        user: {
          email: data.data.user.email,
          phoneNumber: data.data.user.phoneNumber,
          fullName: data.data.user.fullName,
          role: data.data.user.role,
        },
      },
      { status: 200 }
    );
    if (data.data.user.token) {
      res.cookies.set("token", data.data.user.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 7200 * 1000),
        maxAge: 60 * 60 * 2, // 2 hours
      });
    }
    if (data.data.user.role) {
      res.cookies.set("role", data.data.user.role, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 7200 * 1000),
        maxAge: 60 * 60 * 2, // 2 hours
      });
    }
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
