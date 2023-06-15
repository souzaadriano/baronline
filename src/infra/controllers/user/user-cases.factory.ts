import { CreateUserFactory } from '@/infra/factories/use-cases/create-user.factory';

export class UserUseCases {
  public readonly createUser = CreateUserFactory.factory();
}
