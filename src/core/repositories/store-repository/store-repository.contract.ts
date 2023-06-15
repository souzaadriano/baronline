import { StoreEntity } from '@/core/entities/models/store-entity';
import { UUID } from '@/core/entities/value-objects/uuid.object';

export interface StoreRepositoryContract {
  create(storeEntity: StoreEntity): Promise<void>;
  linkToBrand(storeEntity: StoreEntity): Promise<void>;
  listByBrand(brandId: UUID): Promise<StoreEntity[]>;
}
