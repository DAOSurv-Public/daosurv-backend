import { Injectable, Logger } from '@nestjs/common';
import { TweetService } from '../tweet/tweet.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AnalysisService {
  private readonly logger = new Logger(AnalysisService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly tweetService: TweetService,
    private readonly httpService: HttpService,
  ) {}

  async getData(): Promise<void> {
    this.logger.debug('get data from the graph');

    const query =
      '{\n  factories(first: 5) {\n    id\n    poolCount\n    txCount\n    totalVolumeUSD\n  }\n  bundles(first: 5) {\n    id\n    ethPriceUSD\n  }\n}\n';

    const response = await firstValueFrom(
      this.httpService.post(this.configService.get<string>('theGraphUrl'), {
        query,
        variables: null,
      }),
    );

    console.log('response', response.data.data.factories[0].id);

    // this.tweetService.tweet();
  }

  async testTweet(): Promise<void> {}
}
