import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TweetService {
  private readonly logger = new Logger(TweetService.name);
  httpService = null;

  constructor() {
    this.httpService = new HttpService();
  }

  tweet(): void {
    this.logger.verbose('tweet');
    //call api tw tweet
  }
}
