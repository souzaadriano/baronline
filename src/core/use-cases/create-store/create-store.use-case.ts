import { UseCaseContract } from '@/core/contracts/use-case.contract';
import { Dependencies, Input, Output } from './dtos';
import { StoreEntity } from '@/core/entities/models/store-entity';
import { UUID } from '@/core/entities/value-objects/uuid.object';
import { UserDTO } from '@/core/entities/dtos/user.dto';

export class CreateStoreUseCase implements UseCaseContract<Input, Output> {
  constructor(private readonly dependencies: Dependencies) {}
  async handle(input: Input): Promise<Output> {
    const { brandId, name, session } = input;
    await this.validate(input);
    const storeEntity = this.createStoreEntity(brandId, name);
    await this.save(storeEntity);

    return {
      id: storeEntity.id,
      createdAt: storeEntity.createdAt,
      name: storeEntity.name,
      userId: session.user.id,
    };
  }

  private createStoreEntity(brandId: string, name: string) {
    return StoreEntity.create({ brandId, name });
  }

  private async save(storeEntity: StoreEntity) {
    const { storeRepository } = this.dependencies;
    await storeRepository.create(storeEntity);
    await storeRepository.linkToBrand(storeEntity);
  }

  private async validateStore(brandId: string, name: string) {
    const { storeRepository } = this.dependencies;
    const stores = await storeRepository.listByBrand(new UUID(brandId));
    const exists = stores.some((store) => store.name === name);
    if (!exists) return;
    throw new Error(`store already exists at brand ${brandId}`);
  }

  private async validateUserHasAccessToBrand(user: UserDTO, brandId: string) {
    const { brandRepository } = this.dependencies;
    const hasAccess = await brandRepository.userHasAccessToBrand(user.id, [brandId]);
    if (hasAccess) return;
    throw new Error(`user ${user.email} not have access to ${brandId}`);
  }

  private async validate(input: Input) {
    const { brandId, name, session } = input;
    await Promise.all([this.validateStore(brandId, name), this.validateUserHasAccessToBrand(session.user, brandId)]);
  }
}
