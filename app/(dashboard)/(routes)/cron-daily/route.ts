import { refreshDailyReward } from "@/lib/rewards";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await refreshDailyReward();
  return new NextResponse("DONE REFRESHING", { status: 200 });
}