import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import React from 'react'

const DashBoardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription();
  console.log("DashBoardLayout: ",isPro)
  return (
    <div className='h-full relative'>
      {/* desktop view */}
      <div className='hidden h-full md:flex md:flex-col md:fixed md:w-72 inset-y-0 bg-gray-900' >
        <div>
          <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
        </div>
      </div>
      <main className='md:pl-72'>
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashBoardLayout