import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TweetService],
  exports: [TweetService],
})
export class TweetModule {}
