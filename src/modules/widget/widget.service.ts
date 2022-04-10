import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FireStoreService } from '../firestore/firestore.service';

@Injectable()
export class WidgetService {
  private readonly logger = new Logger(WidgetService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly fireStoreService: FireStoreService,
  ) {}

  test() {
    return 'test';
  }

  async getAlerts(dao: string) {
    const db_alerts = await this.fireStoreService.getData(dao, 'alerts');
    return db_alerts;
  }
  async getProposals(dao: string) {
    const db_proposals = await this.fireStoreService.getData(dao, 'proposal');
    return db_proposals;
  }
  async getData(dao: string) {
    const db_proposals = await this.fireStoreService.getData(dao, 'proposal');
    const db_alerts = await this.fireStoreService.getData(dao, 'alerts');
    return {
      alerts: db_alerts,
      db_proposals: db_proposals,
    };
  }
}
