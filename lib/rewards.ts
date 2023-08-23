"use server";
import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export async function resetFreeCounters() {
  await prismadb.userApiLimit.updateMany({
    data: { count: 0 },
  });
}

export async function updateDailyRewardsForAll() {
  await prismadb.userApiLimit.updateMany({ 
    data: { dailyReward: true },
  });
}

export async function checkDailyRewardAvailable() {
  const { userId } = auth();

  if (!userId) {
    console.log("checkDailyRewardAvailable: Unauthorized")
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (!userApiLimit) {
    console.log("checkDailyRewardAvailable: No userApiLimit")
    return false;
  }
  console.log("checkDailyRewardAvailable: ", userApiLimit.dailyReward)
  return !!userApiLimit.dailyReward;
}

export async function claimDailyReward() {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.update({
    where: { userId },
    data: { dailyReward: false },
  });

  return false;
}
export async function refreshDailyReward() {
  try{
    await prismadb.userApiLimit.updateMany({
      data: { dailyReward: true },
    });
  } catch (e) {
    console.log(e)
    return false;
  }
  return true;
}