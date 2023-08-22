"use client"
import { useEffect, useState } from 'react'
import { Button } from './ui/button';
import axios from 'axios';

interface ClaimPointProps {
  isDailyRewardAvailable: boolean;
}


export const ClaimPoint = ( {isDailyRewardAvailable} : ClaimPointProps ) => {
  const [mounted, setMounted] = useState(false);
  const [isClaimed, setIsClaimed] = useState(!isDailyRewardAvailable);

  useEffect(() => {
    setMounted(true);
    console.log(`${isDailyRewardAvailable} ${mounted} ${isClaimed}`);
  }, []);

  if(!mounted || isClaimed) {
    return null;
  }
  async function onClaimDailyReward() {
    setIsClaimed(true);
  }

  return ( isClaimed ? <></> :
    <Button
      variant={'premium'}
      className='ml-2'
      size={'sm'}
      onClick={onClaimDailyReward}
    >
      Claim Reward
    </Button>
  )
}
