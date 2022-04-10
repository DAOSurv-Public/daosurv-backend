import { Module } from '@nestjs/common';
import { FireStoreModule } from '../firestore/firestore.module';
import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';

@Module({
  imports: [FireStoreModule],
  controllers: [WidgetController],
  providers: [WidgetService],
  exports: [WidgetService],
})
export class WidgetModule {}
