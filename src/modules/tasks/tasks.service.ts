import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { PROTOCOLS } from 'src/configs/address.protocols';
import { AnalysisService } from '../analysis/analysis.service';
import { CovalenthqService } from '../covalenthq/covalenthq.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly analysisService: AnalysisService,
    private readonly covalenthqService: CovalenthqService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    //test
    // this.analysisService.queryProposal('nounsdao');
    // this.analysisService.queryBalance('nounsdao');
    // await this.analysisService.queryTransaction('nounsdao');
    // await this.analysisService.queryTransaction('aave');
    // await this.analysisService.queryProposal('aave');
  }

  @Timeout(100)
  async onceJob() {
    this.logger.debug('initial task is running.');
  }
}
