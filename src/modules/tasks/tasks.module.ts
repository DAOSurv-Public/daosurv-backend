import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AnalysisModule } from '../analysis/analysis.module';
import { CovalenthqModule } from '../covalenthq/covalenthq.module';

@Module({
  imports: [ScheduleModule.forRoot(), AnalysisModule],
  controllers: [],
  providers: [TasksService],
})
export class TasksModule {}
