"use client"
import { useEffect, useState } from 'react'
import { Button } from './ui/button';

interface ClaimPointProps {
  isDailyRewardAvailable: boolean;
}


export const ClaimPoint = ( {isDailyRewardAvailable} : ClaimPointProps ) => {
  const [mounted, setMounted] = useState(false);
  const [isClaimed, setIsClaimed] = useState(!isDailyRewardAvailable);

  useEffect(() => {
    setMounted(true);
  }, []);

  if(!mounted || isClaimed) {
    return null;
  }

  
  return ( 
    <Button
      variant={'premium'}
      className='ml-2'
      size={'sm'}
      onClick={() => {
        setIsClaimed(true);
      }}
    >
      Claim Reward
    </Button>
  )
}
