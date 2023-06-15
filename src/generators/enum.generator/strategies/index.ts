import { PermissionRepository } from '@/core/repositories/permission-repository/permission-repository.adapter';
import { PermissionEnumStrategy } from './permission-enum.strategy';
import { RoleEnumStrategy } from './role-enum.strategy';
import { RoleRepository } from '@/core/repositories/role-repository/role-repository.adapter';

export const strategies = [
  new PermissionEnumStrategy(new PermissionRepository()),
  new RoleEnumStrategy(new RoleRepository()),
];
