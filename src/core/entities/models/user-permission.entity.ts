export class UserPermissionEntity {
  readonly id: number;
  readonly userId: string;
  readonly name: string;
  private readonly _status: boolean;

  constructor(permission: UserPermissionEntityConstructor) {
    this.id = permission.permissionId;
    this.name = permission.permission;
    this.userId = permission.userId;
    this._status = permission.status;
  }

  public get isActive() {
    return this._status;
  }
}

export type UserPermissionEntityConstructor = {
  readonly permissionId: number;
  readonly userId: string;
  readonly status: boolean;
  readonly permission: string;
};
