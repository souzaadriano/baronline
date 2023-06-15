import { RepositoryFactory } from '../repository.factory';
import { BrandRepository } from '@/core/repositories/brand-repository/brand-repository.adapter';
import { CreateStoreUseCase } from '@/core/use-cases/create-store/create-store.use-case';
import { StoreRepository } from '@/core/repositories/store-repository/store-repository.adapter';

export class CreateStoreFactory {
  private static useCase: CreateStoreUseCase;
  private constructor() {}

  static factory(): CreateStoreUseCase {
    if (CreateStoreFactory.useCase) return CreateStoreFactory.useCase;
    CreateStoreFactory.useCase = new CreateStoreUseCase({
      brandRepository: RepositoryFactory.get(BrandRepository),
      storeRepository: RepositoryFactory.get(StoreRepository),
    });

    return CreateStoreFactory.useCase;
  }
}
