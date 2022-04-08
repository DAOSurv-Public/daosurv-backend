import { Controller, Get } from '@nestjs/common';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  async getMyFeed() {
    const data = await this.tweetService.getFeed();
    return data;
  }
}
