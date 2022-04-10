import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { PROTOCOLS } from 'src/configs/address.protocols';
import { AnalysisService } from '../analysis/analysis.service';
import { CovalenthqService } from '../covalenthq/covalenthq.service';
import { TweetService } from '../tweet/tweet.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly analysisService: AnalysisService,
    private readonly covalenthqService: CovalenthqService,
    private readonly tweetService: TweetService,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async handleCron() {
    //test
    // await this.analysisService.queryTransaction('nounsdao');
    // await this.analysisService.queryTransaction('aave');
    // await this.analysisService.queryProposal('aave');
  }

  @Timeout(100)
  async onceJob() {
    this.logger.debug('initial task is running.');
    await this.analysisService.clear('nounsdao');
    await this.analysisService.clear('aave');
    await this.analysisService.queryTransaction('nounsdao');
    await this.analysisService.queryTransaction('aave');
    await this.analysisService.queryProposal('aave');
  }
}
