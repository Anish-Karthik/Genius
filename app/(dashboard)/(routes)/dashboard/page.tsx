"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { routes } from '@/app/constants'

const tools = routes;

const DashboardPage = () => {
  const router = useRouter()
  return (
    <div>
      <div className='mb-8 space-t-4'>
        <h2 className='test-2xl md:text-4xl font-bold text-center'>
          Explore the power of AI
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Chat with the smartest AI on the planet - Experience the power of AI
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {tools.map((tool) => (
          tool.label === 'Dashboard' || tool.label === 'Settings' ? null :
          <Card
          onClick={() => router.push(tool.href)}
          key={tool.href}
          className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'
          >
            <div className='flex items-center gap-x-4'>
              <div className={cn('p-x-4 rounded-md',tool.bgColor)}>
                <tool.icon className={cn('w-8 h-8', tool.color)}/>
              </div>
              <div className='font-semibold'>
                {tool.label}
              </div>
            </div>
            <ArrowRight className='w-5 h-5'/>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage