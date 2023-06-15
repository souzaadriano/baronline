import { UserEntity } from '@/core/entities/models/user.entity';
import { AbstractRepository } from '../repository.abstract';
import { UserRepositoryContract } from './user-repository.contract';
import { createUser, findUserByEmail, ICreateUserParams } from '@/Queries/users.queries';

export class UserRepository extends AbstractRepository implements UserRepositoryContract {
  public async findById(id: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.');
  }
  public async findByEmail(email: string): Promise<UserEntity | null> {
    console.log('findByEmail', email);
    const [user] = await findUserByEmail.run({ email }, this.connection);
    console.log('founded user', user);
    if (!user) return null;
    return new UserEntity(user);
  }
  public async save(entity: UserEntity): Promise<void> {
    const user = this.entityToDatabase(entity);
    await createUser.run(user, this.connection);
  }

  private entityToDatabase(user: UserEntity): ICreateUserParams {
    return user;
  }
}
