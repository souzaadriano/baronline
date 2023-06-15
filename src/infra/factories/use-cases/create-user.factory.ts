import { CreateUserUseCase } from '@/core/use-cases/create-user/create-user.use-case';
import { CreateRoleUseCase } from '@/core/use-cases/role/create-role.use-case';
import { AdapterFactory } from '../adpater.factory';
import { HashHandler } from '@/core/adapters/hash-handler.adapter';
import { RepositoryFactory } from '../repository.factory';
import { UserRepository } from '@/core/repositories/user-repository/user-repository.adapter';

export class CreateUserFactory {
  private static useCase: CreateUserUseCase;
  private constructor() {}

  public static factory() {
    if (CreateUserFactory.useCase) return CreateUserFactory.useCase;
    CreateUserFactory.useCase = new CreateUserUseCase({
      hashHandler: AdapterFactory.get(HashHandler),
      userRepository: RepositoryFactory.get(UserRepository),
    });

    return CreateUserFactory.useCase;
  }
}
