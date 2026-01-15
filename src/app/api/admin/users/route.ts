import api from "@/app/lib/axiosInstance";
import { AxiosResponse, isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get("role")?.value;
    if (!role) {
      return NextResponse.json(
        { error: "Session expired, Please login" },
        { status: 401 }
      );
    }
    if (role != "Admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }
        const { searchParams } = new URL(req.url);
    console.log(searchParams);

    const pageNumber = parseInt(searchParams.get("pageNumber") || "1", 10);
    const search = searchParams.get("search")||"";
    const pageSize = searchParams.get("pageSize");
    const res = await api.get("Admin/all-users",{params:{ pageNumber: pageNumber, pageSize: pageSize,search: search }});
    if (res.data) {
      let data = res.data;
      return NextResponse.json({...data }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Failed,Please try again later." },
        { status: 400 }
      );
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (
      !body.isApproving || body.isApproving != "true" && body.isApproving != "false"
    ) {
      return NextResponse.json(
        {
          error: "please Approve or Reject the user",
        },
        { status: 400 }
      );
    }else if (!body.userId || typeof body.userId != "string") {
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 400 }
      );
    }

    const new_body = {
      userId: body.userId,
      suspend : body.isApproving === "true" ? false : true,
    };
    console.log(new_body);
    let data: AxiosResponse<any, any>;
    const cookieStore = await cookies();
    const role = cookieStore.get("role")?.value;
    if (!role) {
      return NextResponse.json(
        { error: "Session expired, Please login" },
        { status: 401 }
      );
    }
    if (role != "Admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }
    // if (new_body.suspend ) {
    // data = await api.post("Admin/activate-user", new_body);
    // } else {
    data = await api.post("Admin/deactivate-user", new_body);
    // }
    console.log(data, data.status);

    return NextResponse.json({ msg:data.data.message }, { status: 200 });
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err.response);
      if (err.response?.status == 401) {
        return NextResponse.json(
          { error: "Session expired, Please login" },
          { status: 401 }
        );
      }
      return NextResponse.json(
        {
          error: err.response?.data.ret_msg || "Failed,Please try again later.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}