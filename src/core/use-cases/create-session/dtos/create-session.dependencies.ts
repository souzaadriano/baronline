import { Logger } from '@/core/adapters/logger.adapter';
import { DateHandlerContract } from '@/core/contracts/date-handler.contract';
import { HashHandlerContract } from '@/core/contracts/hash-handler.contract';
import { SessionManagerContract } from '@/core/contracts/session-manager.contract';
import { PermissionRepositoryContract } from '@/core/repositories/permission-repository/permission-repository.contrat';
import { RoleRepositoryContract } from '@/core/repositories/role-repository/role-repository.contract';
import { UserRepositoryContract } from '@/core/repositories/user-repository/user-repository.contract';

export type Dependencies = {
  userRepository: UserRepositoryContract;
  sessionManager: SessionManagerContract;
  hashHandler: HashHandlerContract;
  permissionRepository: PermissionRepositoryContract;
  roleRepository: RoleRepositoryContract;
  logger: Logger;
  dateHandler: DateHandlerContract;
};
