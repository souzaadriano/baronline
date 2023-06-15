import { UUID } from '../value-objects/uuid.object';
import { Timestamps } from '../value-objects/timestamps.object';
import { Permissions } from '../value-objects/permissions.object';
import { Roles } from '../value-objects/roles.object';
import { PermissionRepositoryContract } from '@/core/repositories/permission-repository/permission-repository.contrat';
import { RoleRepositoryContract } from '@/core/repositories/role-repository/role-repository.contract';
import { UserPermissionsDTO } from '@/core/repositories/permission-repository/dtos/user-permissions.dto';

export class UserEntity {
  private _id: UUID;
  readonly name: string;
  readonly email: string;
  readonly hash: string;
  readonly createdAt: Date;
  readonly updateAt: Date;
  readonly deletedAt?: Date;
  readonly permissions: Permissions;
  readonly roles: Roles;

  constructor(user: UserEntityConstructor) {
    this._id = new UUID(user.id);
    this.name = user.name;
    this.email = user.email;
    this.hash = user.hash;
    this.createdAt = user.createdAt;
    this.updateAt = user.updateAt;
    this.deletedAt = user.deletedAt;
    this.permissions = new Permissions();
    this.roles = new Roles();
  }

  static factory(user: UserEntityFactory) {
    const timestamps = Timestamps.factory();
    return new UserEntity({
      id: UUID.generate(),
      ...user,
      createdAt: timestamps.createdAt,
      updateAt: timestamps.updateAt,
      deletedAt: timestamps.deletedAt,
    });
  }

  get id() {
    return this._id.value;
  }

  async loadPermissions(roleRepository: RoleRepositoryContract, permissionRepository: PermissionRepositoryContract) {
    const roles = await roleRepository.listByUser(this._id.value);
    const userRoles = roles.map((role) => role.name);
    this.roles.addMany(userRoles);
    const rolePermissions = await permissionRepository.rolePermissions(this.roles);
    this.permissions.addMany(rolePermissions.map((rolePermission) => rolePermission.name));
    const userPermissions = await permissionRepository.listUserPermissions(this.id);
    this.setUserPermissions(userPermissions);
  }

  private setUserPermissions(userPermissions: UserPermissionsDTO) {
    this.permissions.addMany(userPermissions.activeNames);
    this.permissions.removeMany(userPermissions.inactiveNames);
  }
}

export type UserEntityConstructor = {
  id: string;
  name: string;
  email: string;
  hash: string;
  createdAt: Date;
  updateAt: Date;
  deletedAt?: Date;
};

export type UserEntityFactory = {
  name: string;
  email: string;
  hash: string;
};
