import { Injectable } from '@nestjs/common';
import { UserUseCases } from './user-cases.factory';
import { CreateUserFactory } from '@/infra/factories/use-cases/create-user.factory';

@Injectable()
export class UserService {
  public readonly createUser = CreateUserFactory.factory();
}
