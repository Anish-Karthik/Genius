import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'
import { checkDailyRewardAvailable, getApiLimitCount, resetFreeCounters, updateDailyRewardsForAll, claimDailyReward } from '@/lib/api-limit'
import { TimerIcon } from 'lucide-react'
import { ClaimPoint } from './ClaimPoint'
import { getIST, isNewDay, isNewWeek, isSameTime } from '@/lib/server-clock'
import { checkSubscription } from '@/lib/subscription'
import { callAfterTimeout } from '@/lib/utils'

const checkcanResetFreeCounter = callAfterTimeout(async () => {
  const date = getIST()
  if(isNewWeek(date)) {
    await resetFreeCounters();
  }
  if(isNewDay(date)) {
    console.log('new day');
    await updateDailyRewardsForAll();
  }
}, 1000);

const Navbar = async () => {
  setInterval(() => {
    checkcanResetFreeCounter()
  }, 1000)
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const isDailyRewardAvailable = await checkDailyRewardAvailable();
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar apiLimitCount={apiLimitCount} isPro />
      <div className='flex w-full justify-end items-center gap-3'>
        <ClaimPoint isDailyRewardAvailable />
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div>
  )
}

export default Navbar