/** Types generated for queries found in "src/infra/database/sql/stores.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'ListStoresByBrandAndUser' parameters type */
export interface IListStoresByBrandAndUserParams {
  brandId?: string | null | void;
  userId?: string | null | void;
}

/** 'ListStoresByBrandAndUser' return type */
export interface IListStoresByBrandAndUserResult {
  brandId: string;
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  name: string;
  updateAt: Date;
}

/** 'ListStoresByBrandAndUser' query type */
export interface IListStoresByBrandAndUserQuery {
  params: IListStoresByBrandAndUserParams;
  result: IListStoresByBrandAndUserResult;
}

const listStoresByBrandAndUserIR: any = {"usedParamSet":{"brandId":true,"userId":true},"params":[{"name":"brandId","required":false,"transform":{"type":"scalar"},"locs":[{"a":612,"b":619}]},{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":651,"b":657}]}],"statement":"select\n    stores.id,\n    stores.\"name\",\n    brands.id as \"brandId\",\n    stores.\"createdAt\",\n    stores.\"updateAt\",\n    stores.\"deletedAt\"\nfrom\n    store_group\n    inner join store_configuration on store_group.\"storeId\" = store_configuration.\"storeId\"\n    inner join configurations on store_configuration.\"configurationId\" = configurations.id\n    inner join brands on store_group.\"brandId\" = brands.id\n    inner join stores on stores.id = store_group.\"storeId\"\n    inner join user_store on user_store.\"storeId\" = stores.id\n    inner join users on users.id = user_store.\"userId\"\nwhere\n    store_group.\"brandId\" = :brandId\n    and user_store.\"userId\" = :userId"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     stores.id,
 *     stores."name",
 *     brands.id as "brandId",
 *     stores."createdAt",
 *     stores."updateAt",
 *     stores."deletedAt"
 * from
 *     store_group
 *     inner join store_configuration on store_group."storeId" = store_configuration."storeId"
 *     inner join configurations on store_configuration."configurationId" = configurations.id
 *     inner join brands on store_group."brandId" = brands.id
 *     inner join stores on stores.id = store_group."storeId"
 *     inner join user_store on user_store."storeId" = stores.id
 *     inner join users on users.id = user_store."userId"
 * where
 *     store_group."brandId" = :brandId
 *     and user_store."userId" = :userId
 * ```
 */
export const listStoresByBrandAndUser = new PreparedQuery<IListStoresByBrandAndUserParams,IListStoresByBrandAndUserResult>(listStoresByBrandAndUserIR);


/** 'ListStoresByBrand' parameters type */
export interface IListStoresByBrandParams {
  brandId?: string | null | void;
}

/** 'ListStoresByBrand' return type */
export interface IListStoresByBrandResult {
  brandId: string;
  brandName: string;
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  name: string;
  updateAt: Date;
}

/** 'ListStoresByBrand' query type */
export interface IListStoresByBrandQuery {
  params: IListStoresByBrandParams;
  result: IListStoresByBrandResult;
}

const listStoresByBrandIR: any = {"usedParamSet":{"brandId":true},"params":[{"name":"brandId","required":false,"transform":{"type":"scalar"},"locs":[{"a":334,"b":341}]}],"statement":"select\n    stores.id,\n    stores.\"name\",\n    brands.id as \"brandId\",\n    brands.\"name\" as \"brandName\",\n    stores.\"createdAt\",\n    stores.\"updateAt\",\n    stores.\"deletedAt\"\nfrom\n    store_group\n    inner join brands on store_group.\"brandId\" = brands.id\n    inner join stores on stores.id = store_group.\"storeId\"\nwhere\n    brands.id = :brandId"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     stores.id,
 *     stores."name",
 *     brands.id as "brandId",
 *     brands."name" as "brandName",
 *     stores."createdAt",
 *     stores."updateAt",
 *     stores."deletedAt"
 * from
 *     store_group
 *     inner join brands on store_group."brandId" = brands.id
 *     inner join stores on stores.id = store_group."storeId"
 * where
 *     brands.id = :brandId
 * ```
 */
export const listStoresByBrand = new PreparedQuery<IListStoresByBrandParams,IListStoresByBrandResult>(listStoresByBrandIR);


/** 'CreateStore' parameters type */
export interface ICreateStoreParams {
  createdAt?: Date | string | null | void;
  deletedAt?: Date | string | null | void;
  id?: string | null | void;
  name?: string | null | void;
  updateAt?: Date | string | null | void;
}

/** 'CreateStore' return type */
export type ICreateStoreResult = void;

/** 'CreateStore' query type */
export interface ICreateStoreQuery {
  params: ICreateStoreParams;
  result: ICreateStoreResult;
}

const createStoreIR: any = {"usedParamSet":{"id":true,"name":true,"createdAt":true,"updateAt":true,"deletedAt":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":88,"b":90}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":93,"b":97}]},{"name":"createdAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":100,"b":109}]},{"name":"updateAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":112,"b":120}]},{"name":"deletedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":123,"b":132}]}],"statement":"INSERT INTO\n    \"stores\" (id, \"name\", \"createdAt\", \"updateAt\", \"deletedAt\")\nVALUES\n    (:id, :name, :createdAt, :updateAt, :deletedAt)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "stores" (id, "name", "createdAt", "updateAt", "deletedAt")
 * VALUES
 *     (:id, :name, :createdAt, :updateAt, :deletedAt)
 * ```
 */
export const createStore = new PreparedQuery<ICreateStoreParams,ICreateStoreResult>(createStoreIR);


/** 'LinkStoreToBrand' parameters type */
export interface ILinkStoreToBrandParams {
  brandId?: string | null | void;
  storeId?: string | null | void;
}

/** 'LinkStoreToBrand' return type */
export type ILinkStoreToBrandResult = void;

/** 'LinkStoreToBrand' query type */
export interface ILinkStoreToBrandQuery {
  params: ILinkStoreToBrandParams;
  result: ILinkStoreToBrandResult;
}

const linkStoreToBrandIR: any = {"usedParamSet":{"brandId":true,"storeId":true},"params":[{"name":"brandId","required":false,"transform":{"type":"scalar"},"locs":[{"a":65,"b":72}]},{"name":"storeId","required":false,"transform":{"type":"scalar"},"locs":[{"a":75,"b":82}]}],"statement":"INSERT INTO\n    \"store_group\" (\"brandId\", \"storeId\")\nVALUES\n    (:brandId, :storeId)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "store_group" ("brandId", "storeId")
 * VALUES
 *     (:brandId, :storeId)
 * ```
 */
export const linkStoreToBrand = new PreparedQuery<ILinkStoreToBrandParams,ILinkStoreToBrandResult>(linkStoreToBrandIR);


