import { PermissionEntity } from '@/core/entities/models/permission.entity';
import { AbstractRepository } from '../repository.abstract';
import { PermissionRepositoryContract } from './permission-repository.contrat';
import { listPermissions, listRolePermissions } from '@/infra/database/queries/permissions.queries';
import { Roles } from '@/core/entities/value-objects/roles.object';
import { UserPermissionsDTO } from './dtos/user-permissions.dto';
import { UserPermissionEntity } from '@/core/entities/models/user-permission.entity';
import { IReadUserPermissionsResult, readUserPermissions } from '@/infra/database/queries/users.queries';

export class PermissionRepository extends AbstractRepository implements PermissionRepositoryContract {
  public async listUserPermissions(userId: string): Promise<UserPermissionsDTO> {
    const dataset = await readUserPermissions.run({ userId }, this.connection);
    const userPermissions = this.mapUserPermissions(dataset);
    return new UserPermissionsDTO(userId, userPermissions);
  }

  public async rolePermissions(roles: Roles): Promise<PermissionEntity[]> {
    const dataset = await listRolePermissions.run({ roles: roles.list() }, this.connection);
    return dataset.map((permission) => new PermissionEntity(permission.permissionId, permission.name));
  }

  public async list(): Promise<PermissionEntity[]> {
    const permissions = await listPermissions.run(undefined, this.connection);
    return permissions.map((permission) => new PermissionEntity(permission.id, permission.name));
  }

  private mapUserPermissions(dataset: IReadUserPermissionsResult[]) {
    return dataset.map((item) => new UserPermissionEntity(item));
  }
}
