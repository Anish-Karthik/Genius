import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimit =async () => {  

  const {userId} = auth();

  if (!userId) return;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where:{ userId } //userId === userId
  });

  if(userApiLimit ) {
    await prismadb.userApiLimit.update({
        where: { userId },
        data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
        data: { userId, count: 1 },
    });
  }
}

export const checkApiLimit = async ()=> {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
}

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (!userApiLimit) {
    return 0;
  }
  return userApiLimit.count;
}

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
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (!userApiLimit) {
    return false;
  }

  return userApiLimit.dailyReward;
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




