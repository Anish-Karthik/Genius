import { NextResponse } from "next/server";

export async function GET(req:Request) {
  return new NextResponse("Hello01", {status: 200});
}