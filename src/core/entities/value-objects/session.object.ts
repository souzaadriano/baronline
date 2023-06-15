import { UserDTO } from '../dtos/user.dto';
import { UUID } from './uuid.object';
import { Permissions } from './permissions.object';
import { Roles } from './roles.object';
import { JsonSession } from '../dtos/session.dto';
import { Json } from '@/utils/json/json.object';
import { PERMISSION } from '../enums/permission.enum';
import { DateCalc, Instant } from './instant.object';
import { DATE_FORMAT } from '../enums/date-format.enum';

export class Session {
  private readonly _id: UUID;
  private readonly _user: UserDTO;
  private readonly _permissions: Permissions;
  private readonly _roles: Roles;
  private readonly _issuedAt: Instant;
  private readonly _expireAt: Instant;
  private readonly _refreshValue: DateCalc;

  constructor(input: SessionConstructor) {
    const { permissions, roles, user, id, expiresIn, refreshValue, expireAt, issuedAt } = input;
    const defaultExpireIn: DateCalc = { minutes: 0 };
    this._id = id ?? UUID.factory();
    this._user = user;
    this._permissions = permissions;
    this._roles = roles;
    this._issuedAt = issuedAt ?? Instant.now();
    this._refreshValue = refreshValue;
    this._expireAt = expireAt ?? Instant.create(this._issuedAt).increment(expiresIn ?? defaultExpireIn);
  }

  static createFromJson(input: string) {
    const session = Json.parse<JsonSession>(input);
    return new Session({
      id: new UUID(session.id),
      permissions: Permissions.createFromSession(session),
      roles: Roles.createFromSession(session),
      user: session.user,
      expireAt: Instant.parse(session.expireAt),
      refreshValue: session.refreshTime,
      issuedAt: Instant.parse(session.issuedAt),
    });
  }

  public hasPermission(permission: PERMISSION) {
    return this._permissions.has(permission);
  }

  public refreshExpires() {
    this._expireAt.increment(this._refreshValue);
  }

  public get expireAt() {
    return this._expireAt.cloneInstant();
  }

  public get issuedAt() {
    return this._issuedAt.cloneInstant();
  }

  public refreshExpireTime() {
    return Object.entries(this._refreshValue).reduce((payload, input) => {
      const [key, value] = input;
      return payload + `${key}: ${value}`;
    }, '');
  }

  public get permissions() {
    return Array.from(this._permissions.list());
  }

  public get roles() {
    return Array.from(this._roles.list());
  }

  public get user() {
    return this._user;
  }

  public get id() {
    return this._id.value;
  }

  public setPermission(permissionName: string): void;
  public setPermission(permissionNames: string[]): void;
  public setPermission(permission: string | string[]): void {
    typeof permission === 'string' ? this._permissions.add(permission) : this._permissions.addMany(permission);
  }

  public setRole(roleName: string): void;
  public setRole(roleNames: string[]): void;
  public setRole(role: string | string[]): void {
    typeof role === 'string' ? this._permissions.add(role) : this._permissions.addMany(role);
  }

  public toJson() {
    return JSON.stringify(this.parseToJsonSession());
  }

  private parseToJsonSession(): JsonSession {
    return {
      permissions: this.permissions,
      roles: this.roles,
      user: this.user,
      id: this.id,
      issuedAt: this._issuedAt.toString(DATE_FORMAT.STANDARD),
      expireAt: this._expireAt.toString(DATE_FORMAT.STANDARD),
      refreshTime: this._refreshValue,
    };
  }
}

export type SessionConstructor = {
  id?: UUID;
  user: UserDTO;
  permissions: Permissions;
  roles: Roles;
  expiresIn?: DateCalc;
  refreshValue: DateCalc;
  expireAt?: Instant;
  issuedAt?: Instant;
};
