import { PermissionRepositoryContract } from '@/core/repositories/permission-repository/permission-repository.contrat';
import { EnumField, EnumGeneratorStrategyContract } from './enum-generator.strategy.contract';
import { RoleRepositoryContract } from '@/core/repositories/role-repository/role-repository.contract';

export class RoleEnumStrategy implements EnumGeneratorStrategyContract {
  constructor(private readonly roleRepository: RoleRepositoryContract) {}
  public name = 'ROLE';
  public fileName = 'role.enum.ts';
  public filePath = 'core/entities/enums';

  public async getFields(): Promise<EnumField[]> {
    const roles = await this.roleRepository.list();
    return roles.map((role) => ({
      key: this.keyMaker(role.name),
      value: `'${role.name}'`,
    }));
  }

  private keyMaker(value: any) {
    return value.toString().replaceAll(' ', '_').replaceAll('-', '_').replaceAll('.', '_').toUpperCase();
  }
}
