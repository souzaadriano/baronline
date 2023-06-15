import { UseCaseContract } from '@/core/contracts/use-case.contract';
import { Output, Input, Dependencies } from './dtos';
import { BrandEntity } from '@/core/entities/models/brand.entity';
import { Session } from '@/core/entities/value-objects/session.object';
import { UUID } from '@/core/entities/value-objects/uuid.object';

export class CreateBrandUseCase implements UseCaseContract<Input, Output> {
  constructor(private readonly dependencies: Dependencies) {}

  async handle(input: Input): Promise<Output> {
    const { name, session } = input;
    const brandEntity = this.createBrandEntity(name, session);
    await this.validateBrandAlreadyExists(name, session);
    await this.saveBrand(brandEntity);

    return {
      id: brandEntity.id,
      name: brandEntity.name,
      userId: brandEntity.user.id,
      createdAt: brandEntity.createdAt,
    };
  }

  private createBrandEntity(name: string, session: Session) {
    return BrandEntity.create({
      user: session.user,
      name,
    });
  }

  private async saveBrand(brand: BrandEntity) {
    const { brandRepository } = this.dependencies;
    await brandRepository.create(brand);
  }

  private async validateBrandAlreadyExists(name: string, session: Session) {
    const { brandRepository } = this.dependencies;
    const userId = new UUID(session.user.id);
    const userBrands = await brandRepository.listUserBrands(userId.value);

    userBrands.forEach((brand) => {
      if (brand.name === name) throw new Error(`Brand ${name} already exists`);
    });
  }
}
