import { Module } from '@nestjs/common';
import { TweetModule } from './modules/tweet/tweet.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { generalConfig } from './configs/general.config';
import { WidgetModule } from './modules/widget/widget.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [generalConfig],
      isGlobal: true,
    }),
    TasksModule,
    WidgetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
