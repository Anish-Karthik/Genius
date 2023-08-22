import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs";

import { claimDailyReward, checkDailyRewardAvailable } from '@/lib/rewards';

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    

    console.log("[CLAIM_DAILY_REWARD]",userId);

    if(!userId) {
      console.log("[CLAIM_DAILY_REWARD] Unauthorized");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const available = await checkDailyRewardAvailable();
    console.log("[CLAIM_DAILY_REWARD]",available);
    if (!available) {
      return new NextResponse("Reward already claimed", { status: 403 });
    }

    await claimDailyReward();

    return new NextResponse("Reward claimed", { status: 200 });
  }
  catch (error) {
    console.error("[CLAIM_DAILY_REWARD_ERROR]",error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
