import { auth } from '@clerk/nextjs';

import prismadb from './prismadb';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export async function checkSubscription() : Promise<boolean> {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;// !! ENSURE THIS IS A BOOLEAN
}