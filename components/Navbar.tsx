import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { TimerIcon } from 'lucide-react'
import { ClaimPoint } from './ClaimPoint'

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar apiLimitCount={apiLimitCount} isPro />
      <div className='flex w-full justify-end'>
        <ClaimPoint />
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div>
  )
}

export default Navbar