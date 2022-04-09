import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WidgetService {
  private readonly logger = new Logger(WidgetService.name);

  constructor(private readonly configService: ConfigService) {}

  test() {
    return 'test';
  }
}
