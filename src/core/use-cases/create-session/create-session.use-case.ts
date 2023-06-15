import { UseCaseContract } from '@/core/contracts/use-case.contract';
import { Dependencies, Input, Output } from './dtos';
import { Email } from '@/core/entities/value-objects/email.object';
import { UserEntity } from '@/core/entities/models/user.entity';
import { Hash } from '@/core/entities/value-objects/Hash.object';
import { DATE_FORMAT } from '@/core/entities/enums/date-format.enum';
import { Session } from '@/core/entities/value-objects/session.object';
export class CreateSessionUseCase implements UseCaseContract<Input, Output> {
  constructor(private readonly dependencies: Dependencies) {}

  async handle(input: Input): Promise<Output> {
    const { email, password } = input;
    const user = await this.getUserByEmail(email);
    await this.validatePassword(user, password);
    await this.loadUserPermissions(user);
    const session = await this.createSession(user);
    const payload = this.output(session);
    console.log('payload', payload);
    return payload;
  }

  private output(session: Session): Output {
    return {
      userEmail: session.user.email,
      sessionId: session.id,
      userId: session.user.id,
      userName: session.user.name,
      issuedAt: session.issuedAt.toString(DATE_FORMAT.STANDARD),
    };
  }

  private async createSession(user: UserEntity) {
    const { sessionManager } = this.dependencies;
    return await sessionManager.create(user);
  }

  private async loadUserPermissions(user: UserEntity) {
    const { permissionRepository, roleRepository } = this.dependencies;
    await user.loadPermissions(roleRepository, permissionRepository);
  }

  private async getUserByEmail(input: string) {
    const email = Email.create(input);
    const { userRepository } = this.dependencies;
    const user = await userRepository.findByEmail(email.value);
    if (!user) throw new Error(`user not found for email ${email.value}`);
    return user;
  }

  private async validatePassword(user: UserEntity, password: string) {
    const { hashHandler } = this.dependencies;
    const hash = new Hash(user.hash, password);
    console.log('user.session: validatePassword', hash);
    await hash.isValid(hashHandler);
  }
}

export type CreateSessionOutput = Output;
