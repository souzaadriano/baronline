import { AbstractRedisKey } from '../key.abstract.redis';
import { RedisKeyContract } from '../redis-key.contract';
import { RedisSessionConfig } from './session.redis-key.config';

export class SessionRedisKey extends AbstractRedisKey implements RedisKeyContract {
  private configuration = new RedisSessionConfig();

  constructor() {
    super(['SESSION']);
  }

  public make(input: string) {
    return this.keyMaker(input);
  }

  get expireConfig() {
    return this.configuration.expireTime;
  }

  get refreshConfig() {
    return this.configuration.refreshTime;
  }

  public expireInSeconds(): number {
    return this.calculateExpireTime(this.configuration.expireTime);
  }

  public refreshInSeconds() {
    return this.calculateExpireTime(this.configuration.refreshTime);
  }
}
