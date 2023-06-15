import { CreateSessionFactory } from '@/infra/factories/use-cases/create-session.factory';
import { CreateStoreFactory } from '@/infra/factories/use-cases/create-store.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {
  public readonly createStore = CreateStoreFactory.factory();
}
