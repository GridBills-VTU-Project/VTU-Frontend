import api from "@/app/lib/axiosInstance";
import { isAxiosError } from "axios";
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
    
    const res = await api.get("Admin/agent-dashboard",{params:{ pageNumber: pageNumber, pageSize: pageSize,search: search }});
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
    const body = await req.json();
    console.log(body);
    if (!body.agentId?.trim()) {
      return NextResponse.json(
        { error: "Please provide agent ID." },
        { status: 400 }
      );
    }
    const res = await api.post("Admin/approve-agent/"+body.agentId);
    console.log(res.data);
    
    if (res.data) {
      let data = res.data;
      return NextResponse.json({msg:"Success"}, { status: 200 });
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
