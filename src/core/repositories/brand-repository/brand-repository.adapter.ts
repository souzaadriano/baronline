import { BrandEntity } from '@/core/entities/models/brand.entity';
import { BrandRepositoryContract } from './brand-repository.contract';
import { AbstractRepository } from '../repository.abstract';
import {
  ICreateBrandParams,
  ILinkBrandToUserParams,
  IListUserBrandsResult,
  createBrand,
  linkBrandToUser,
  listUserBrands,
} from '@/infra/database/queries/brands.queries';
import { UUID } from '@/core/entities/value-objects/uuid.object';

export class BrandRepository extends AbstractRepository implements BrandRepositoryContract {
  async listUserBrands(userId: string): Promise<BrandEntity[]> {
    const dataset = await listUserBrands.run({ userId }, this.connection);
    return this.mapDataSetToBrandEntity(dataset);
  }

  async userHasAccessToBrand(userId: string, brands: string[]): Promise<boolean> {
    const userBrands = await this.listUserBrands(userId);
    const brandSet = new Set(brands);
    return !userBrands.some((brand) => !brandSet.has(brand.id));
  }

  async create(entity: BrandEntity): Promise<void> {
    await createBrand.run(this.entityToICreateBrandParams(entity), this.connection);
    await linkBrandToUser.run(this.entityToILinkBrandToUserParams(entity), this.connection);
  }

  private entityToICreateBrandParams(entity: BrandEntity): ICreateBrandParams {
    return {
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updateAt,
    };
  }

  private entityToILinkBrandToUserParams(entity: BrandEntity): ILinkBrandToUserParams {
    return {
      brandId: entity.id,
      userId: entity.user.id,
    };
  }

  private mapDataSetToBrandEntity(dataset: IListUserBrandsResult[]) {
    return dataset.map(
      (item) =>
        new BrandEntity({
          configuration: JSON.stringify(item.configuration),
          createdAt: item.createdAt,
          updateAt: item.updateAt,
          deletedAt: item.deletedAt,
          id: item.id,
          name: item.name,
          userEmail: item.userEmail,
          userId: item.userid,
          userName: item.userName,
        }),
    );
  }
}
