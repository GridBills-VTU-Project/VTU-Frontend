import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ msg: "Logged out" });
  response.cookies.set({
    name: "token",
    value: "",
    expires: new Date(0), // expires immediately
    maxAge: 0, // expires immediately
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  return response;
}