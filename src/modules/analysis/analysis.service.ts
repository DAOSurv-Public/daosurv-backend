import { Injectable, Logger } from '@nestjs/common';
import { TweetService } from '../tweet/tweet.service';

@Injectable()
export class AnalysisService {
  private readonly logger = new Logger(AnalysisService.name);

  constructor(private readonly tweetService: TweetService) {}

  getData(): void {
    this.logger.verbose('get data from the graph');

    this.tweetService.tweet();
  }
}
