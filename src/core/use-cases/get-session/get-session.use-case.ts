import { UseCaseContract } from '@/core/contracts/use-case.contract';
import { Dependencies, Input, Output } from './dtos';

export class GetSessionUseCase implements UseCaseContract<Input, Output> {
  constructor(private readonly dependencies: Dependencies) {}

  async handle(input: Input): Promise<Output> {
    const { sessionId } = input;
    const { sessionManager } = this.dependencies;

    const session = await sessionManager.find(sessionId);
    if (!session) throw new Error('session not found');

    return session;
  }
}
