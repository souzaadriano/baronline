import { UseCaseContract } from '@/core/contracts/use-case.contract';
import { Dependencies, Input, Output } from './validate-user.types';
import { Email } from '@/core/entities/value-objects/email.object';

export class ValidateUserUseCase implements UseCaseContract<Input, Output> {
  constructor(private readonly dependencies: Dependencies) {}
  async handle(input: Input): Promise<Output> {
    const { email, password } = input;
    const user = await this.findUser(email);
    await this.passwordMatch(user.hash, password);

    return {};
  }

  private async findUser(value: string) {
    const { userRepository } = this.dependencies;
    const email = Email.create(value);
    const user = await userRepository.findByEmail(email.value);
    if (user) return user;
    throw new Error();
  }

  private async passwordMatch(hash: string, value: string) {
    const { hashHandler } = this.dependencies;
    const matched = await hashHandler.match({ hash, value });
    if (matched) return;

    throw new Error();
  }
}
