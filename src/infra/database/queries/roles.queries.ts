/** Types generated for queries found in "src/infra/database/sql/roles.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'ListRoles' parameters type */
export type IListRolesParams = void;

/** 'ListRoles' return type */
export interface IListRolesResult {
  id: number;
  name: string;
}

/** 'ListRoles' query type */
export interface IListRolesQuery {
  params: IListRolesParams;
  result: IListRolesResult;
}

const listRolesIR: any = {"usedParamSet":{},"params":[],"statement":"select\n    \"id\",\n    \"name\"\nfrom\n    \"roles\"\nwhere\n    \"deletedAt\" is NULL"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     "id",
 *     "name"
 * from
 *     "roles"
 * where
 *     "deletedAt" is NULL
 * ```
 */
export const listRoles = new PreparedQuery<IListRolesParams,IListRolesResult>(listRolesIR);


