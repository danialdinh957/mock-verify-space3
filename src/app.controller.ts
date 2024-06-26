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
  accumulate(@Query('quantity') quantity: string) {
    const nowDate = new Date().getTime();
    const res: any = [];

    if (!quantity) {
      return [];
    }

    for (let i = 0; i < Number(quantity); i++) {
      res.push({
        completedTimes: 1,
        timestamp: new Date(
          nowDate - (Number(quantity) - i) * 1000,
        ).toISOString(),
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
