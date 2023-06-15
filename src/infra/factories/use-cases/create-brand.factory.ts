import { CreateBrandUseCase } from '@/core/use-cases/create-brand/create-brand.use-case';
import { RepositoryFactory } from '../repository.factory';
import { BrandRepository } from '@/core/repositories/brand-repository/brand-repository.adapter';

export class CreateBrandFactory {
  private static useCase: CreateBrandUseCase;
  private constructor() {}

  static factory(): CreateBrandUseCase {
    if (CreateBrandFactory.useCase) return CreateBrandFactory.useCase;
    CreateBrandFactory.useCase = new CreateBrandUseCase({
      brandRepository: RepositoryFactory.get(BrandRepository),
    });

    return CreateBrandFactory.useCase;
  }
}
