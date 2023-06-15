import { RoleEntity } from '@/core/entities/models/role.entity';

export interface RoleRepositoryContract {
  list(): Promise<RoleEntity[]>;
  listByUser(userId: string): Promise<RoleEntity[]>;
}
