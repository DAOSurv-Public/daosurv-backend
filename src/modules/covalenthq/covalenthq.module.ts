import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CovalenthqService } from './covalenthq.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [CovalenthqService],
  exports: [CovalenthqService],
})
export class CovalenthqModule {}
