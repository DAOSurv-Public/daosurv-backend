import { Module } from '@nestjs/common';
import { FireStoreService } from './firestore.service';
@Module({
  imports: [],
  controllers: [],
  providers: [FireStoreService],
  exports: [FireStoreService],
})
export class FireStoreModule {}
