/** Types generated for queries found in "src/infra/database/sql/permissions.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'ListPermissions' parameters type */
export type IListPermissionsParams = void;

/** 'ListPermissions' return type */
export interface IListPermissionsResult {
  id: number;
  name: string;
}

/** 'ListPermissions' query type */
export interface IListPermissionsQuery {
  params: IListPermissionsParams;
  result: IListPermissionsResult;
}

const listPermissionsIR: any = {"usedParamSet":{},"params":[],"statement":"select\n    \"id\",\n    \"name\"\nfrom\n    \"permissions\"\nwhere\n    \"deletedAt\" is NULL"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     "id",
 *     "name"
 * from
 *     "permissions"
 * where
 *     "deletedAt" is NULL
 * ```
 */
export const listPermissions = new PreparedQuery<IListPermissionsParams,IListPermissionsResult>(listPermissionsIR);


/** 'ListRolePermissions' parameters type */
export interface IListRolePermissionsParams {
  roles: readonly (string | null | void)[];
}

/** 'ListRolePermissions' return type */
export interface IListRolePermissionsResult {
  name: string;
  permissionId: number;
  roleId: number;
}

/** 'ListRolePermissions' query type */
export interface IListRolePermissionsQuery {
  params: IListRolePermissionsParams;
  result: IListRolePermissionsResult;
}

const listRolePermissionsIR: any = {"usedParamSet":{"roles":true},"params":[{"name":"roles","required":false,"transform":{"type":"array_spread"},"locs":[{"a":237,"b":242}]}],"statement":"select\n    \"roleId\",\n    \"permissionId\",\n    \"permissions\".\"name\"\nfrom\n    \"role_permissions\"\n    inner join \"permissions\" on \"permissionId\" = \"permissions\".id\n    inner join \"roles\" on \"roleId\" = \"roles\".id\nwhere\n    \"roles\".\"name\" in (:roles)"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     "roleId",
 *     "permissionId",
 *     "permissions"."name"
 * from
 *     "role_permissions"
 *     inner join "permissions" on "permissionId" = "permissions".id
 *     inner join "roles" on "roleId" = "roles".id
 * where
 *     "roles"."name" in (:roles)
 * ```
 */
export const listRolePermissions = new PreparedQuery<IListRolePermissionsParams,IListRolePermissionsResult>(listRolePermissionsIR);


