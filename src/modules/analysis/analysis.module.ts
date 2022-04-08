import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { TweetModule } from '../tweet/tweet.module';

@Module({
  imports: [TweetModule],
  controllers: [],
  providers: [AnalysisService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
