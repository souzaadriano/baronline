import { HashHandlerContract } from '@/core/contracts/hash-handler.contract';
import { UserRepositoryContract } from '@/core/repositories/user-repository/user-repository.contract';

export type Dependencies = {
  hashHandler: HashHandlerContract;
  userRepository: UserRepositoryContract;
};

export type Input = {
  readonly email: string;
  readonly password: string;
};

export type Output = {};
