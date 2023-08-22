import { claimDailyReward, checkDailyRewardAvailable } from '@/lib/rewards';
import { CronJob } from 'cron';


export class MyCronJob {
  cronJob: CronJob;

  constructor() {
    this.cronJob = new CronJob('0 0 * * *', async () => {
      try {
        await this.resetValue();  
      } catch (e) {
        console.error(e);
      }
    });

    if (!this.cronJob.running) {
      this.cronJob.start();
    }
  }

  async resetValue(): Promise<void> {
    // Add your logic here to reset the value in the Prisma database
    console.log("Resetting value");
    if (await checkDailyRewardAvailable()) {
      await claimDailyReward();
      console.log("Reset value");
    }
  }
  async getValue(): Promise<boolean> {
    return await checkDailyRewardAvailable();
  }
}


