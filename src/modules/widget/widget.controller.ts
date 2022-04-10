import { Controller, Get, Param } from '@nestjs/common';
import { WidgetService } from './widget.service';

@Controller('widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get('alerts/:dao')
  async getAlerts(@Param('dao') dao) {
    const data = await this.widgetService.getAlerts(dao);
    return data;
  }
}
