"use client"
import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export const BotAvatar = () => {
  return (
    <Avatar className='h-8 w-8 items-center justify-center'>
      <AvatarImage src={"/images/logo.png"} className='h-7 w-7'/>
    </Avatar>
  )
}
