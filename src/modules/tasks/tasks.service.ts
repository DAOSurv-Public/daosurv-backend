import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { AnalysisService } from '../analysis/analysis.service';
import { CovalenthqService } from '../covalenthq/covalenthq.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly analysisService: AnalysisService,
    private readonly covalenthqService: CovalenthqService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    //test
    this.analysisService.getData();
  }

  @Timeout(100)
  async onceJob() {
    this.logger.debug('initial task is running.');
    // const res = await this.covalenthqService.getSpotPrices('ETH');
    // console.log(res.data.items[0].quote_rate);
  }
}
