import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const DashBoardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='h-full relative'>
      {/* desktop view */}
      <div className='hidden h-full md:flex md:flex-col md:fixed md:w-72 inset-y-0 z-[80] bg-gray-900' >
        <div>
          <Sidebar />
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