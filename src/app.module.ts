import { Module } from '@nestjs/common';
import { TweetModule } from './modules/tweet/tweet.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { generalConfig } from './configs/general.config';
import { WidgetModule } from './modules/widget/widget.module';
import { SubgraphModule } from './modules/subgraph/subgraph.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [generalConfig],
      isGlobal: true,
    }),
    TasksModule,
    WidgetModule,
    SubgraphModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
