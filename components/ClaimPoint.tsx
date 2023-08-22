"use client"
import { useEffect, useState } from 'react'
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';

interface ClaimPointProps {
  isDailyRewardAvailable: boolean;
}


export const ClaimPoint = ( {isDailyRewardAvailable} : ClaimPointProps ) => {
  const [mounted, setMounted] = useState(false);
  const [isClaimed, setIsClaimed] = useState(!isDailyRewardAvailable);
  const userId = useAuth();

  useEffect(() => {
    setMounted(true);
    console.log(`${isDailyRewardAvailable} ${mounted} ${isClaimed}`);
  }, []);

  if(!mounted || isClaimed) {
    return null;
  }
  async function onClaimDailyReward() {
    try {
      const res = await axios.put('/api/rewards/claim-daily',{credentials: userId});
      if(res.status === 200) {
        setIsClaimed(true);
        toast.success("Daily reward claimed");
      } else {
        toast.error("Failed to claim daily reward");
        setIsClaimed(true);
      }
    } catch (error) {
      setIsClaimed(true);
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
