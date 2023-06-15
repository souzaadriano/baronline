/** Types generated for queries found in "src/infra/database/sql/users.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateUser' parameters type */
export interface ICreateUserParams {
  email?: string | null | void;
  hash?: string | null | void;
  id?: string | null | void;
  name?: string | null | void;
}

/** 'CreateUser' return type */
export type ICreateUserResult = void;

/** 'CreateUser' query type */
export interface ICreateUserQuery {
  params: ICreateUserParams;
  result: ICreateUserResult;
}

const createUserIR: any = {"usedParamSet":{"id":true,"name":true,"email":true,"hash":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":62,"b":64}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":67,"b":71}]},{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":74,"b":79}]},{"name":"hash","required":false,"transform":{"type":"scalar"},"locs":[{"a":82,"b":86}]}],"statement":"INSERT INTO\n    \"users\" (id, \"name\", email, hash)\nVALUES\n    (:id, :name, :email, :hash)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "users" (id, "name", email, hash)
 * VALUES
 *     (:id, :name, :email, :hash)
 * ```
 */
export const createUser = new PreparedQuery<ICreateUserParams,ICreateUserResult>(createUserIR);


/** 'ReadActiveUsers' parameters type */
export type IReadActiveUsersParams = void;

/** 'ReadActiveUsers' return type */
export interface IReadActiveUsersResult {
  createdAt: Date;
  deletedAt: Date | null;
  email: string;
  hash: string;
  id: string;
  name: string;
  updateAt: Date;
}

/** 'ReadActiveUsers' query type */
export interface IReadActiveUsersQuery {
  params: IReadActiveUsersParams;
  result: IReadActiveUsersResult;
}

const readActiveUsersIR: any = {"usedParamSet":{},"params":[],"statement":"select\n    *\nfrom\n    \"users\"\nwhere\n    \"users\".\"deletedAt\" IS NULL"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     *
 * from
 *     "users"
 * where
 *     "users"."deletedAt" IS NULL
 * ```
 */
export const readActiveUsers = new PreparedQuery<IReadActiveUsersParams,IReadActiveUsersResult>(readActiveUsersIR);


/** 'FindUserByEmail' parameters type */
export interface IFindUserByEmailParams {
  email?: string | null | void;
}

/** 'FindUserByEmail' return type */
export interface IFindUserByEmailResult {
  createdAt: Date;
  deletedAt: Date | null;
  email: string;
  hash: string;
  id: string;
  name: string;
  updateAt: Date;
}

/** 'FindUserByEmail' query type */
export interface IFindUserByEmailQuery {
  params: IFindUserByEmailParams;
  result: IFindUserByEmailResult;
}

const findUserByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":58,"b":63}]}],"statement":"select\n    *\nfrom\n    \"users\"\nwhere\n    \"users\".\"email\" = :email"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     *
 * from
 *     "users"
 * where
 *     "users"."email" = :email
 * ```
 */
export const findUserByEmail = new PreparedQuery<IFindUserByEmailParams,IFindUserByEmailResult>(findUserByEmailIR);


/** 'ReadUserPermissions' parameters type */
export interface IReadUserPermissionsParams {
  userId?: string | null | void;
}

/** 'ReadUserPermissions' return type */
export interface IReadUserPermissionsResult {
  permission: string;
  permissionId: number;
  status: boolean;
  userId: string;
}

/** 'ReadUserPermissions' query type */
export interface IReadUserPermissionsQuery {
  params: IReadUserPermissionsParams;
  result: IReadUserPermissionsResult;
}

const readUserPermissionsIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":261,"b":267}]}],"statement":"select\n    \"userId\",\n    \"permissionId\",\n    \"status\",\n    \"permissions\".\"name\" as \"permission\"\nfrom\n    \"user_permissions\"\n    inner join \"users\" on \"userId\" = \"users\".id\n    inner join \"permissions\" on \"permissionId\" = \"permissions\".id\nwhere\n    \"users\".id = :userId"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     "userId",
 *     "permissionId",
 *     "status",
 *     "permissions"."name" as "permission"
 * from
 *     "user_permissions"
 *     inner join "users" on "userId" = "users".id
 *     inner join "permissions" on "permissionId" = "permissions".id
 * where
 *     "users".id = :userId
 * ```
 */
export const readUserPermissions = new PreparedQuery<IReadUserPermissionsParams,IReadUserPermissionsResult>(readUserPermissionsIR);


/** 'ReadUserRoles' parameters type */
export interface IReadUserRolesParams {
  userId?: string | null | void;
}

/** 'ReadUserRoles' return type */
export interface IReadUserRolesResult {
  role: string;
  roleId: number;
  userId: string;
}

/** 'ReadUserRoles' query type */
export interface IReadUserRolesQuery {
  params: IReadUserRolesParams;
  result: IReadUserRolesResult;
}

const readUserRolesIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":205,"b":211}]}],"statement":"select\n    \"userId\",\n    \"roleId\",\n    \"roles\".\"name\" as \"role\"\nfrom\n    \"user_roles\"\n    inner join \"users\" on \"userId\" = \"users\".id\n    inner join \"roles\" on \"roleId\" = \"roles\".id\nwhere\n    \"users\".id = :userId"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     "userId",
 *     "roleId",
 *     "roles"."name" as "role"
 * from
 *     "user_roles"
 *     inner join "users" on "userId" = "users".id
 *     inner join "roles" on "roleId" = "roles".id
 * where
 *     "users".id = :userId
 * ```
 */
export const readUserRoles = new PreparedQuery<IReadUserRolesParams,IReadUserRolesResult>(readUserRolesIR);


