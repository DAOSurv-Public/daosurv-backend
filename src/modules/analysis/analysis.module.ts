import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { TweetModule } from '../tweet/tweet.module';
import { HttpModule } from '@nestjs/axios';
import { CovalenthqModule } from '../covalenthq/covalenthq.module';
import { FireStoreModule } from '../firestore/firestore.module';
@Module({
  imports: [TweetModule, HttpModule, CovalenthqModule, FireStoreModule],
  controllers: [],
  providers: [AnalysisService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
