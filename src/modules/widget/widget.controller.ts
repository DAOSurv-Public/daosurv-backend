import { Controller, Get } from '@nestjs/common';
import { WidgetService } from './widget.service';

@Controller('widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get()
  async test() {
    const data = await this.widgetService.test();
    return data;
  }
}
