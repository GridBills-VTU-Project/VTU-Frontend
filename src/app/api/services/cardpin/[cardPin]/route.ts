import { NextResponse } from "next/server";
import api from "@/app/lib/axiosInstance";
import { isAxiosError } from "axios";
import { numRegex } from "@/app/constants/constant";
export async function GET(
  req: Request,
  context: { params: Promise<{ cardPin: string }> }
) {
  try {
    const { cardPin } = await context.params;
    console.log(cardPin);

    const res = await api.get("Data/" + cardPin);

    if (res.data) {
      let data = res.data;
      return NextResponse.json({...data}, { status: 200 });
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