import { NextResponse } from "next/server";
import api from "@/app/lib/axiosInstance";
import { AxiosResponse, isAxiosError } from "axios";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
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
      res = await api.get("Agent/agent-dashboard");
    } else {
      res = await api.get("Wallet/dashboard");
    }

    if (res.data) {
      let data = res.data;
      return NextResponse.json({ data }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Failed" }, { status: 400 });
    }
  } catch (err) {
    // console.error(err);

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
