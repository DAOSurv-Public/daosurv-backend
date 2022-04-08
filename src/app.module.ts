import { Module } from '@nestjs/common';
import { TweetModule } from './modules/tweet/tweet.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { generalConfig } from './configs/general.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [generalConfig],
      isGlobal: true,
    }),
    TweetModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
