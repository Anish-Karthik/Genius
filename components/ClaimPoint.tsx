"use client"
import { useEffect, useState } from 'react'
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';
import { checkDailyRewardAvailable, claimDailyReward } from '@/lib/rewards';
import { set } from 'zod';

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
  async function onClaimDailyReward() {
    try {
      if(await checkDailyRewardAvailable()) {
        await claimDailyReward();
        setIsClaimed(true);
        toast.success("Daily reward claimed");
      } else {
        setIsClaimed(true);
        toast.error("Daily reward not available");
      }
    } catch (error) {
      toast.error("Failed to claim daily reward. Internal server error");
    }
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
