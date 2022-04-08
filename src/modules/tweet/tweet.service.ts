import { Injectable, Logger } from '@nestjs/common';
import * as Twitter from 'twitter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TweetService {
  private readonly logger = new Logger(TweetService.name);
  twitterClient = null;

  constructor(private readonly configService: ConfigService) {
    this.twitterClient = new Twitter({
      consumer_key: this.configService.get('twitter.consumer_key'),
      consumer_secret: this.configService.get('twitter.consumer_secret'),
      access_token_key: this.configService.get('twitter.access_token_key'),
      access_token_secret: this.configService.get(
        'twitter.access_token_secret',
      ),
      // bearer_token: this.configService.get('twitter.bearer_token'),
    });
  }

  async tweet(msg: string): Promise<void> {
    try {
      await this.twitterClient.post('statuses/update', { status: msg });
      this.logger.debug(`tweet : ${msg}`);
    } catch (error) {
      this.logger.error(`tweet : `, JSON.stringify(error));
    }
  }
}
