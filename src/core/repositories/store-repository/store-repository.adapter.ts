import { StoreEntity } from '@/core/entities/models/store-entity';
import { UUID } from '@/core/entities/value-objects/uuid.object';
import { AbstractRepository } from '../repository.abstract';
import { StoreRepositoryContract } from './store-repository.contract';
import { createStore, linkStoreToBrand, listStoresByBrand } from '@/infra/database/queries/stores.queries';

export class StoreRepository extends AbstractRepository implements StoreRepositoryContract {
  async create(storeEntity: StoreEntity): Promise<void> {
    await createStore.run(
      {
        createdAt: storeEntity.createdAt,
        deletedAt: storeEntity.deletedAt,
        updateAt: storeEntity.updateAt,
        id: storeEntity.id,
        name: storeEntity.name,
      },
      this.connection,
    );
  }

  async linkToBrand(storeEntity: StoreEntity): Promise<void> {
    await linkStoreToBrand.run(
      {
        brandId: storeEntity.brandId,
        storeId: storeEntity.id,
      },
      this.connection,
    );
  }

  async listByBrand(brandId: UUID): Promise<StoreEntity[]> {
    const dataset = await listStoresByBrand.run({ brandId: brandId.value }, this.connection);
    return dataset.map(
      (store) =>
        new StoreEntity({
          brandId: brandId.value,
          createdAt: store.createdAt,
          updateAt: store.createdAt,
          deletedAt: store.deletedAt,
          id: store.id,
          name: store.name,
        }),
    );
  }
}
