import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, cert, ServiceAccount} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
@Injectable()
export class FireStoreService {
  private readonly logger = new Logger(FireStoreService.name);
  db = null
  constructor(
    private readonly configService: ConfigService
  ) {
    const serviceAccount: ServiceAccount = {
        projectId: this.configService.get("firestore.project_id"),
        clientEmail: this.configService.get("firestore.client_email"),
        privateKey: this.configService.get("firestore.private_key")
    }
    initializeApp({
        credential: cert(serviceAccount)
    });
    this.db = getFirestore();
  }

  async storeData(collection: string, document: string, data: any): Promise<void> {
    const docRef = this.db.collection(collection).doc(document);
    await docRef.set(data);
  }

  async getData(collection: string, document: string): Promise<any> {
    const docRef = this.db.collection(collection).doc(document)
    const res = await docRef.get();
    return res.data();
  }
}
