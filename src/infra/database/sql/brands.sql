/* @name CreateBrand */
INSERT INTO
    "brands" (id, "name", "createdAt", "updateAt", "deletedAt")
VALUES
    (:id, :name, :createdAt, :updatedAt, NULL);

/* @name LinkBrandToUser */
INSERT INTO
    "user_brand" ("brandId", "userId")
VALUES
    (:brandId, :userId);

/* @name listUserBrands */
select
    users.id as "userid",
    users."name" as "userName",
    users.email as "userEmail",
    brands.id,
    brands."name",
    brands."createdAt",
    brands."updateAt",
    brands."deletedAt",
    configurations."content" as "configuration"
from
    user_brand
    inner join brands on brands.id = user_brand."brandId"
    inner join users on users.id = user_brand."userId"
    inner join brand_configuration on brand_configuration."brandId" = user_brand."brandId"
    inner join configurations on brand_configuration."configurationId" = configurations.id
where
    user_brand."userId" = :userId;