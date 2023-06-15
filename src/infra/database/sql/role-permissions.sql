/* 
 @name SetRolePermissions 
 @param rolePermission -> ((roleId, permissionId)...)
 */
INSERT INTO
    "role_permissions" ("roleId", "permissionId")
VALUES
    :rolePermission;