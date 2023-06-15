import { PermissionEntity } from '@/core/entities/models/permission.entity';
import { UserPermissionEntity } from '@/core/entities/models/user-permission.entity';

class FilteredPermissionsDTO {
  readonly active: PermissionEntity[] = [];
  readonly inactive: PermissionEntity[] = [];
}

export class UserPermissionsDTO {
  readonly userId: string;
  private readonly _permissions: FilteredPermissionsDTO;
  constructor(userId: string, permissions: UserPermissionEntity[]) {
    this._permissions = permissions.reduce((payload, permission) => {
      permission.isActive
        ? payload.active.push(new PermissionEntity(permission.id, permission.name))
        : payload.inactive.push(new PermissionEntity(permission.id, permission.name));
      return payload;
    }, new FilteredPermissionsDTO());

    this.userId = userId;
  }

  public get atctives() {
    return this._permissions.active;
  }

  public get inactives() {
    return this._permissions.inactive;
  }

  public get activeNames() {
    return this.atctives.map((permission) => permission.name);
  }

  public get inactiveNames() {
    return this.inactives.map((permission) => permission.name);
  }
}
