"use client"

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'
import { LayoutDashboardIcon, MessageSquareIcon, ImageIcon, VideoIcon, MusicIcon, CodeIcon, SettingsIcon } from "lucide-react"

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"]
});

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboardIcon,
    href: '/dashboard',
    color: "text-sky-500",
  },
  {
    label: 'Conversation',
    icon: MessageSquareIcon,
    href: '/conversation',
    color: "text-violet-500",
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: "text-pink-700",
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: "text-orange-700",
  },    
  {
    label: 'Music Generation',
    icon: MusicIcon,
    href: '/music',
    color: "text-emerald-500",
  },
  {
    label: 'Code Generation',
    icon: CodeIcon,
    href: '/code',
    color: "text-green-500",
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    href: '/settings',
    color: "text-white-500",
  },
]

const Sidebar = () => {
  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link href='/dashboard' className="flex items-center pl-3 mb-14">
          <div className='relative w-8 h-8 mr-4'>
            <Image 
              fill
              alt='logo'
              src={'/images/logo.png'}
            />
          </div>
          <h1 className={cn('text-2xl font-bold', montserrat.className)}>
            Genius
          </h1>
        </Link>

        <div className='space-y-1'>
          {routes.map((route) =>(
            <Link
              key={route.label}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ',
                montserrat.className,
              )}
            >
              <div className='flex items-center flex-1'>
                <route.icon className={cn('w-5 h-5 mr-2',route.color)} aria-hidden='true' />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar