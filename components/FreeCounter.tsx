"use client"
import React, { useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { MAX_FREE_COUNTS } from '@/constants'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { Zap, ZapIcon } from 'lucide-react'
import { useProModal } from '@/hooks/use-pro-modal'
interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

const FreeCounter = ({ apiLimitCount = 0, isPro = false } : FreeCounterProps) => {
  const proModel = useProModal()
  console.log("FreeCounter: ",isPro)
  const [mounted, setMounted] = React.useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;
  if (isPro) return null;

  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardContent className="py-6">
          <div className='text-center text-sm text-white mb-4 space-y-2'>
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generation
            </p>
            <Progress className='h-3' value={(apiLimitCount / MAX_FREE_COUNTS) * 100}/>
          </div>
          <Button variant={"premium"} className='w-full' onClick={proModel.onOpen} >
            Upgrade
            <ZapIcon className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default FreeCounter