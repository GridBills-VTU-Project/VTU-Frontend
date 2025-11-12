import api from "@/app/lib/axiosInstance";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

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
