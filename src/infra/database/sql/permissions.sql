/* @name ListPermissions */
select
    "id",
    "name"
from
    "permissions"
where
    "deletedAt" is NULL;

/* @name ListRolePermissions @param roles -> (...)*/
select
    "roleId",
    "permissionId",
    "permissions"."name"
from
    "role_permissions"
    inner join "permissions" on "permissionId" = "permissions".id
    inner join "roles" on "roleId" = "roles".id
where
    "roles"."name" in (:roles);