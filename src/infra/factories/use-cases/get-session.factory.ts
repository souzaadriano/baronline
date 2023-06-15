import { GetSessionUseCase } from '@/core/use-cases/get-session/get-session.use-case';
import { AdapterFactory } from '../adpater.factory';
import { SessionManager } from '@/core/adapters/session-manager.adapter';

export class GetSessionUseCaseFactory {
  private constructor() {}

  public static factory() {
    return new GetSessionUseCase({
      sessionManager: AdapterFactory.get(SessionManager),
    });
  }
}
