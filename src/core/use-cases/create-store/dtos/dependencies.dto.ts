import { BrandRepositoryContract } from '@/core/repositories/brand-repository/brand-repository.contract';
import { StoreRepositoryContract } from '@/core/repositories/store-repository/store-repository.contract';

export type Dependencies = {
  storeRepository: StoreRepositoryContract;
  brandRepository: BrandRepositoryContract;
};
