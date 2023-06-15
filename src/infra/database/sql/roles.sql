/* @name ListRoles */
select
    "id",
    "name"
from
    "roles"
where
    "deletedAt" is NULL;