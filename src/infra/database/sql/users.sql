/* @name CreateUser */
INSERT INTO
    "users" (id, "name", email, hash)
VALUES
    (:id, :name, :email, :hash);

/* @name ReadActiveUsers */
select
    *
from
    "users"
where
    "users"."deletedAt" IS NULL;

/* @name FindUserByEmail */
select
    *
from
    "users"
where
    "users"."email" = :email;

/* @name ReadUserPermissions */
select
    "userId",
    "permissionId",
    "status",
    "permissions"."name" as "permission"
from
    "user_permissions"
    inner join "users" on "userId" = "users".id
    inner join "permissions" on "permissionId" = "permissions".id
where
    "users".id = :userId;

/* @name ReadUserRoles */
select
    "userId",
    "roleId",
    "roles"."name" as "role"
from
    "user_roles"
    inner join "users" on "userId" = "users".id
    inner join "roles" on "roleId" = "roles".id
where
    "users".id = :userId;