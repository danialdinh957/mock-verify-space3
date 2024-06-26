import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/accumulate')
  accumulate(
    @Query()
    {
      quantity,
      startDate,
      fromDate,
      toDate,
    }: {
      quantity: string;
      startDate: string;
      fromDate: string;
      toDate: string;
    },
  ) {
    const startTime = new Date(startDate).getTime();
    const fromTime = new Date(fromDate).getTime();
    const checkpointTimes = Math.floor((fromTime - startTime) / 1000);

    const res: { completedTimes: number; timestamp: string }[] = [];

    let count = 0;

    if (checkpointTimes < 1) count = Number(quantity);
    else count = Number(quantity) - checkpointTimes;

    if (count < 1) {
      return [];
    }

    for (let i = 0; i < count; i++) {
      const checkpointTime = Math.max(fromTime, startTime);
      const timestamp = new Date(checkpointTime + (i + 1) * 1000).toISOString();

      const isExpired =
        new Date(toDate).getTime() < new Date(timestamp).getTime();
      if (isExpired) break;

      res.push({
        completedTimes: 1,
        timestamp,
      });
    }

    return res;
  }

  @Get('/recurrent')
  recurrent(@Query('success') success: string) {
    if (success === 'true') {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  }
}
