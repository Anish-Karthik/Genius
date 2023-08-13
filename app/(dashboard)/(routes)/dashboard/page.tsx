"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight, MessageSquareIcon, ImageIcon, VideoIcon, MusicIcon, CodeIcon } from 'lucide-react'


const tools = [
  {
    label: "Conversation Tools",
    icon: MessageSquareIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: "text-orange-700",
    bgColor: "bg-orange-500/10",
  },    
  {
    label: 'Music Generation',
    icon: MusicIcon,
    href: '/music',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Code Generation',
    icon: CodeIcon,
    href: '/code',
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];

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