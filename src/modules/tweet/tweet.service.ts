import { Injectable, Logger } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TweetService {
  private readonly logger = new Logger(TweetService.name);
  twitterClient = null;

  constructor(private readonly configService: ConfigService) {
    this.twitterClient = new TwitterApi(
      this.configService.get<string>('twitterApiKey'),
    );
  }

  async tweet(msg: string): Promise<void> {
    try {
      await this.twitterClient.v1.tweet(msg);
      this.logger.debug(`tweet : ${msg}`);
    } catch (error) {
      this.logger.error(`tweet : `, error);
    }
  }
}
