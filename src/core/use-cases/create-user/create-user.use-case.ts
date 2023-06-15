import { UseCaseContract } from '@/core/contracts/use-case.contract';
import { Dependencies, Input, Output } from './create-user.type';
import { UserEntity } from '@/core/entities/models/user.entity';

export class CreateUserUseCase implements UseCaseContract<Input, Output> {
  constructor(private readonly dependencies: Dependencies) {}
  async handle(input: Input): Promise<Output> {
    const { email, name, password } = input;
    const hash = await this.hashPassword(password);
    const user = UserEntity.factory({ name, email, hash });
    await this.saveUser(user);

    return { id: user.id, email: user.email, createdAt: user.createdAt };
  }

  private async hashPassword(password: string) {
    const { hashHandler } = this.dependencies;
    return await hashHandler.hash(password);
  }

  private async saveUser(user: UserEntity) {
    const { userRepository } = this.dependencies;
    await userRepository.save(user);
  }
}
