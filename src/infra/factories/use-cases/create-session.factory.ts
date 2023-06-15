import { CreateSessionUseCase } from '@/core/use-cases/create-session/create-session.use-case';
import { AdapterFactory } from '../adpater.factory';
import { HashHandler } from '@/core/adapters/hash-handler.adapter';
import { RepositoryFactory } from '../repository.factory';
import { PermissionRepository } from '@/core/repositories/permission-repository/permission-repository.adapter';
import { RoleRepository } from '@/core/repositories/role-repository/role-repository.adapter';
import { UserRepository } from '@/core/repositories/user-repository/user-repository.adapter';
import { SessionManager } from '@/core/adapters/session-manager.adapter';
import { DateHandler } from '@/core/adapters/date-handler.adapter';
import { Logger } from '@/core/adapters/logger.adapter';

export class CreateSessionFactory {
  private static useCase: CreateSessionUseCase;
  private constructor() {}

  public static factory() {
    if (CreateSessionFactory.useCase) return CreateSessionFactory.useCase;
    CreateSessionFactory.useCase = new CreateSessionUseCase({
      hashHandler: AdapterFactory.get(HashHandler),
      sessionManager: AdapterFactory.get(SessionManager),
      permissionRepository: RepositoryFactory.get(PermissionRepository),
      roleRepository: RepositoryFactory.get(RoleRepository),
      userRepository: RepositoryFactory.get(UserRepository),
      dateHandler: RepositoryFactory.get(DateHandler),
      logger: RepositoryFactory.get(Logger),
    });

    return CreateSessionFactory.useCase;
  }
}
