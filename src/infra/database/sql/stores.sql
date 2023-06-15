/* @name listStoresByBrandAndUser */
select
    stores.id,
    stores."name",
    brands.id as "brandId",
    stores."createdAt",
    stores."updateAt",
    stores."deletedAt"
from
    store_group
    inner join store_configuration on store_group."storeId" = store_configuration."storeId"
    inner join configurations on store_configuration."configurationId" = configurations.id
    inner join brands on store_group."brandId" = brands.id
    inner join stores on stores.id = store_group."storeId"
    inner join user_store on user_store."storeId" = stores.id
    inner join users on users.id = user_store."userId"
where
    store_group."brandId" = :brandId
    and user_store."userId" = :userId;

/* @name listStoresByBrand */
select
    stores.id,
    stores."name",
    brands.id as "brandId",
    brands."name" as "brandName",
    stores."createdAt",
    stores."updateAt",
    stores."deletedAt"
from
    store_group
    inner join brands on store_group."brandId" = brands.id
    inner join stores on stores.id = store_group."storeId"
where
    brands.id = :brandId;

/* @name createStore */
INSERT INTO
    "stores" (id, "name", "createdAt", "updateAt", "deletedAt")
VALUES
    (:id, :name, :createdAt, :updateAt, :deletedAt);

/* @name linkStoreToBrand */
INSERT INTO
    "store_group" ("brandId", "storeId")
VALUES
    (:brandId, :storeId);