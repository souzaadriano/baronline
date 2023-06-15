import { CreateSessionFactory } from '@/infra/factories/use-cases/create-session.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  public readonly createSession = CreateSessionFactory.factory();
}
