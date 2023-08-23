import { refreshDailyReward } from "@/lib/rewards";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await refreshDailyReward();
  return new NextResponse("Hello", {status: 200});
}