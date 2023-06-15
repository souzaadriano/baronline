import { BrandEntity } from '@/core/entities/models/brand.entity';
import { UUID } from '@/core/entities/value-objects/uuid.object';

export interface BrandRepositoryContract {
  create(entity: BrandEntity): Promise<void>;
  listUserBrands(id: string): Promise<BrandEntity[]>;
  userHasAccessToBrand(userId: string, brands: string[]): Promise<boolean>;
}
