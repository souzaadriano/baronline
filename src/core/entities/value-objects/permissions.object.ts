import { JsonSession } from '../dtos/session.dto';
import { PERMISSION } from '../enums/permission.enum';
import { PermissionEntity } from '../models/permission.entity';

export class Permissions {
  private readonly data: Set<string>;

  constructor(permissions?: PermissionEntity[]) {
    this.data = new Set<string>(permissions?.map((permission) => permission.name));
  }

  static createFromSession(session: JsonSession) {
    const permissions = new Permissions();
    permissions.addMany(session.permissions);
    return permissions;
  }

  public has(permissionName: PERMISSION) {
    return this.data.has(permissionName);
  }

  public add(permissionName: string): void {
    this.data.add(permissionName);
  }

  public addMany(permissionNames: string[]): void {
    permissionNames.forEach((permission) => this.data.add(permission));
  }

  public remove(permissionName: string): void {
    this.data.delete(permissionName);
  }

  public removeMany(permissionNames: string[]): void {
    permissionNames.forEach((name) => this.data.delete(name));
  }

  public list(): string[] {
    return Array.from(this.data.values());
  }

  public get quantity(): number {
    return this.data.size;
  }
}
