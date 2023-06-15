import { PermissionEntity } from '@/core/entities/models/permission.entity';
import { Roles } from '@/core/entities/value-objects/roles.object';
import { UserPermissionsDTO } from './dtos/user-permissions.dto';

export interface PermissionRepositoryContract {
  list(): Promise<PermissionEntity[]>;
  rolePermissions(roles: Roles): Promise<PermissionEntity[]>;
  listUserPermissions(userId: string): Promise<UserPermissionsDTO>;
}
