import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";
import { MAX_FREE_COUNTS, WEEK } from "@/constants";
import { callAfterTimeout } from "./utils";

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
  resetFreeCounterAfterAWeek();
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

export async function resetFreeCounter() {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }
  await prismadb.userApiLimit.update({
    where: { userId },
    data: { count: 0 },
  });
}
export function resetFreeCounterClient() {
  resetFreeCounter();
}

export const resetFreeCounterAfterAWeek = callAfterTimeout(resetFreeCounter, WEEK)




