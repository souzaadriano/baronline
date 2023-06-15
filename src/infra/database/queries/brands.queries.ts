/** Types generated for queries found in "src/infra/database/sql/brands.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

/** 'CreateBrand' parameters type */
export interface ICreateBrandParams {
  createdAt?: Date | string | null | void;
  id?: string | null | void;
  name?: string | null | void;
  updatedAt?: Date | string | null | void;
}

/** 'CreateBrand' return type */
export type ICreateBrandResult = void;

/** 'CreateBrand' query type */
export interface ICreateBrandQuery {
  params: ICreateBrandParams;
  result: ICreateBrandResult;
}

const createBrandIR: any = {"usedParamSet":{"id":true,"name":true,"createdAt":true,"updatedAt":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":88,"b":90}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":93,"b":97}]},{"name":"createdAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":100,"b":109}]},{"name":"updatedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":112,"b":121}]}],"statement":"INSERT INTO\n    \"brands\" (id, \"name\", \"createdAt\", \"updateAt\", \"deletedAt\")\nVALUES\n    (:id, :name, :createdAt, :updatedAt, NULL)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "brands" (id, "name", "createdAt", "updateAt", "deletedAt")
 * VALUES
 *     (:id, :name, :createdAt, :updatedAt, NULL)
 * ```
 */
export const createBrand = new PreparedQuery<ICreateBrandParams,ICreateBrandResult>(createBrandIR);


/** 'LinkBrandToUser' parameters type */
export interface ILinkBrandToUserParams {
  brandId?: string | null | void;
  userId?: string | null | void;
}

/** 'LinkBrandToUser' return type */
export type ILinkBrandToUserResult = void;

/** 'LinkBrandToUser' query type */
export interface ILinkBrandToUserQuery {
  params: ILinkBrandToUserParams;
  result: ILinkBrandToUserResult;
}

const linkBrandToUserIR: any = {"usedParamSet":{"brandId":true,"userId":true},"params":[{"name":"brandId","required":false,"transform":{"type":"scalar"},"locs":[{"a":63,"b":70}]},{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":73,"b":79}]}],"statement":"INSERT INTO\n    \"user_brand\" (\"brandId\", \"userId\")\nVALUES\n    (:brandId, :userId)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "user_brand" ("brandId", "userId")
 * VALUES
 *     (:brandId, :userId)
 * ```
 */
export const linkBrandToUser = new PreparedQuery<ILinkBrandToUserParams,ILinkBrandToUserResult>(linkBrandToUserIR);


/** 'ListUserBrands' parameters type */
export interface IListUserBrandsParams {
  userId?: string | null | void;
}

/** 'ListUserBrands' return type */
export interface IListUserBrandsResult {
  configuration: Json;
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  name: string;
  updateAt: Date;
  userEmail: string;
  userid: string;
  userName: string;
}

/** 'ListUserBrands' query type */
export interface IListUserBrandsQuery {
  params: IListUserBrandsParams;
  result: IListUserBrandsResult;
}

const listUserBrandsIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":597,"b":603}]}],"statement":"select\n    users.id as \"userid\",\n    users.\"name\" as \"userName\",\n    users.email as \"userEmail\",\n    brands.id,\n    brands.\"name\",\n    brands.\"createdAt\",\n    brands.\"updateAt\",\n    brands.\"deletedAt\",\n    configurations.\"content\" as \"configuration\"\nfrom\n    user_brand\n    inner join brands on brands.id = user_brand.\"brandId\"\n    inner join users on users.id = user_brand.\"userId\"\n    inner join brand_configuration on brand_configuration.\"brandId\" = user_brand.\"brandId\"\n    inner join configurations on brand_configuration.\"configurationId\" = configurations.id\nwhere\n    user_brand.\"userId\" = :userId"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     users.id as "userid",
 *     users."name" as "userName",
 *     users.email as "userEmail",
 *     brands.id,
 *     brands."name",
 *     brands."createdAt",
 *     brands."updateAt",
 *     brands."deletedAt",
 *     configurations."content" as "configuration"
 * from
 *     user_brand
 *     inner join brands on brands.id = user_brand."brandId"
 *     inner join users on users.id = user_brand."userId"
 *     inner join brand_configuration on brand_configuration."brandId" = user_brand."brandId"
 *     inner join configurations on brand_configuration."configurationId" = configurations.id
 * where
 *     user_brand."userId" = :userId
 * ```
 */
export const listUserBrands = new PreparedQuery<IListUserBrandsParams,IListUserBrandsResult>(listUserBrandsIR);


