import { DATE_CALC, DateCalc } from '@/core/entities/value-objects/instant.object';
import { RedisConnectionFactory } from '../engine';

export abstract class AbstractRedisKey {
  protected _redis = RedisConnectionFactory.factory();
  constructor(protected readonly prefix: string[]) {}

  protected keyMaker(key: string) {
    return `${this.prefix.join(':')}/${key}`;
  }

  public get redis() {
    return this._redis.connection;
  }

  public calculateExpireTime(input: DateCalc) {
    return Object.entries(input).reduce((totalInSeconds, item) => {
      const [key, value] = item;
      return totalInSeconds + this.calculateTime(key, value);
    }, 0);
  }

  private calculateTime(key: string, value: number) {
    switch (key) {
      case DATE_CALC.MILLISECONDS: {
        return value * 1000;
      }
      case DATE_CALC.SECONDS: {
        return value;
      }
      case DATE_CALC.MINUTES: {
        return value * 60;
      }
      case DATE_CALC.HOURS: {
        return value * 60 * 60;
      }
      default: {
        throw new Error();
      }
    }
  }
}
