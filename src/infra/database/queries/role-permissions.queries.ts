/** Types generated for queries found in "src/infra/database/sql/role-permissions.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'SetRolePermissions' parameters type */
export interface ISetRolePermissionsParams {
  rolePermission: readonly ({
    roleId: number | null | void,
    permissionId: number | null | void
  })[];
}

/** 'SetRolePermissions' return type */
export type ISetRolePermissionsResult = void;

/** 'SetRolePermissions' query type */
export interface ISetRolePermissionsQuery {
  params: ISetRolePermissionsParams;
  result: ISetRolePermissionsResult;
}

const setRolePermissionsIR: any = {"usedParamSet":{"rolePermission":true},"params":[{"name":"rolePermission","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"roleId","required":false},{"name":"permissionId","required":false}]},"locs":[{"a":73,"b":87}]}],"statement":"INSERT INTO\n    \"role_permissions\" (\"roleId\", \"permissionId\")\nVALUES\n    :rolePermission"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "role_permissions" ("roleId", "permissionId")
 * VALUES
 *     :rolePermission
 * ```
 */
export const setRolePermissions = new PreparedQuery<ISetRolePermissionsParams,ISetRolePermissionsResult>(setRolePermissionsIR);


