import api from "@/app/lib/axiosInstance";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await context.params;
    if (!reference) {
      return NextResponse.json(
        { msg: "No reference provided" },
        { status: 400 }
      );
    }
    console.log("reference", reference);

    const data = await api.get(`Wallet/verify/${reference}`);
    console.log("Eee",data.data.data);

    return NextResponse.json({...data.data});
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      console.error("rrrr",err.response);
      if (err.response?.status === 401) {
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
