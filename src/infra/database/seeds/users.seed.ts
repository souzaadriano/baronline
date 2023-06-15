import { CreateUserFactory } from '@/infra/factories/use-cases/create-user.factory';
import { DatabaseConnectionEngine } from '../engine';
import { ICreateUserParams, createUser } from '../queries/users.queries';
import { SeedContract } from './seed.contract';

export class UsersSeed implements SeedContract {
  private createUser = CreateUserFactory.factory();
  async seed(): Promise<void> {
    await this.createUser.handle({
      email: 'adriano.souza@test.com',
      name: 'adriano souza',
      password: 'test',
    });
  }
}
