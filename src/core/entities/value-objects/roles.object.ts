import { JsonSession } from '../dtos/session.dto';
import { ROLE } from '../enums/role.enum';
import { RoleEntity } from '../models/role.entity';

export class Roles {
  private readonly data: Set<string>;

  constructor(Roles?: RoleEntity[]) {
    this.data = new Set<string>(Roles?.map((permission) => permission.name));
  }

  static createFromSession(session: JsonSession) {
    const roles = new Roles();
    roles.addMany(session.roles);
    return roles;
  }

  public has(role: ROLE) {
    return this.data.has(role);
  }

  public add(role: string): void {
    this.data.add(role);
  }

  public addMany(roles: string[]): void {
    roles.forEach((role) => this.data.add(role));
  }

  public remove(role: string): void {
    this.data.delete(role);
  }

  public list(): string[] {
    return Array.from(this.data.values());
  }

  public get quantity(): number {
    return this.data.size;
  }
}
