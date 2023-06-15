import { RoleEntity } from '@/core/entities/models/role.entity';
import { RoleRepositoryContract } from './role-repository.contract';
import { listRoles } from '@/infra/database/queries/roles.queries';
import { AbstractRepository } from '../repository.abstract';
import { readUserRoles } from '@/infra/database/queries/users.queries';

export class RoleRepository extends AbstractRepository implements RoleRepositoryContract {
  async listByUser(userId: string): Promise<RoleEntity[]> {
    const dataset = await readUserRoles.run({ userId }, this.connection);
    return dataset.map((role) => new RoleEntity(role.roleId, role.role));
  }
  async list(): Promise<RoleEntity[]> {
    const dataset = await listRoles.run(undefined, this.connection);
    return dataset.map((role) => new RoleEntity(role.id, role.name));
  }
}
