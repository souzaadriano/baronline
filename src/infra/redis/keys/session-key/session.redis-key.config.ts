import { DateCalc, dateCalcValidSet } from '@/core/entities/value-objects/instant.object';
import { Environment } from 'environment-variables-decorator';

export class RedisSessionConfig {
  @Environment('SESSION_EXPIRE_IN_VALUE')
  value: number;

  @Environment('SESSION_EXPIRE_IN_TYPE')
  type: string;

  @Environment('SESSION_REFRESH_VALUE')
  refreshValue: number;

  @Environment('SESSION_REFRESH_TYPE')
  refreshType: string;

  get refreshTime(): DateCalc {
    this.validateExpireType(this.refreshType);
    return { [this.type]: this.value };
  }

  get expireTime(): DateCalc {
    this.validateExpireType(this.type);
    return { [this.type]: this.value };
  }

  private validateExpireType(type: string) {
    if (!dateCalcValidSet.has(type)) {
      throw new Error('invalid type');
    }
  }
}
