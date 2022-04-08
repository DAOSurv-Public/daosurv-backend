import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { TweetModule } from '../tweet/tweet.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [TweetModule, HttpModule],
  controllers: [],
  providers: [AnalysisService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
