import { Module } from '@nestjs/common';
import { FireStoreModule } from '../firestore/firestore.module';
import { AnalysisService } from '../analysis/analysis.service';
import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';
import { AnalysisModule } from '../analysis/analysis.module';

@Module({
  imports: [FireStoreModule, AnalysisModule],
  controllers: [WidgetController],
  providers: [WidgetService],
  exports: [WidgetService],
})
export class WidgetModule {}
