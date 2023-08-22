import { refreshDailyReward } from '@/lib/rewards';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await refreshDailyReward();
    console.log("refreshDailyReward")
    return NextResponse.json({ok: true, message: "refreshDailyReward"});
  } catch (e) {
    console.log("[CRON_ERROR] refreshDailyReward", e)
    return NextResponse.json({ok: false, message: "refreshDailyReward"});
  }
}


