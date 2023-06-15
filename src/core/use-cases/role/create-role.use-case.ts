import { UseCaseContract } from '@/core/contracts/use-case.contract';
import { Dependencies, Input, Output } from './create-role.type';

export class CreateRoleUseCase implements UseCaseContract<Input, Output> {
  constructor(private readonly dependencies: Dependencies) {}
  async handle(input: Input): Promise<Output> {
    throw new Error('Method not implemented.');
  }
}
