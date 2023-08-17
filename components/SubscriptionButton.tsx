"use client"

import { use, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ZapIcon } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton = ({ isPro = false}: SubscriptionButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');

      router.push(response.data.url);
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant={isPro? "default": "premium"} onClick={onClick} disabled={loading} >
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <ZapIcon className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  )
}
