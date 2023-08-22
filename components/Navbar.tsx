import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { ClaimPoint } from './ClaimPoint'
import { checkSubscription } from '@/lib/subscription'
import { checkDailyRewardAvailable } from '@/lib/rewards'


const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const isDailyRewardAvailable = await checkDailyRewardAvailable();
  console.log(`[{(Navbar)}]: ${isDailyRewardAvailable}`);
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar apiLimitCount={apiLimitCount} isPro />
      <div className='flex w-full justify-end items-center gap-3'>
        <ClaimPoint isDailyRewardAvailable={isDailyRewardAvailable} />
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div>
  )
}

export default Navbar