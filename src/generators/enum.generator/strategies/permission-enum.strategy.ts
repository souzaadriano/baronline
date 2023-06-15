import { PermissionRepositoryContract } from '@/core/repositories/permission-repository/permission-repository.contrat';
import { EnumField, EnumGeneratorStrategyContract } from './enum-generator.strategy.contract';

export class PermissionEnumStrategy implements EnumGeneratorStrategyContract {
  constructor(private readonly permissionRepository: PermissionRepositoryContract) {}
  public name = 'PERMISSION';
  public fileName = 'permission.enum.ts';
  public filePath = 'core/entities/enums';

  public async getFields(): Promise<EnumField[]> {
    const permissions = await this.permissionRepository.list();
    return permissions.map((permission) => ({
      key: this.keyMaker(permission.name),
      value: `'${permission.name}'`,
    }));
  }

  private keyMaker(value: any) {
    return value.toString().replaceAll(' ', '_').replaceAll('-', '_').replaceAll('.', '_').toUpperCase();
  }
}
