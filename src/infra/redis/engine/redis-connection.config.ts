import { Environment } from 'environment-variables-decorator';

export class RedisConnectionConfig {
  @Environment('REDIS_HOST')
  host: string;

  @Environment('REDIS_PASSWORD')
  password: string;

  // @Environment('REDIS_USER')
  // username: string;

  @Environment('REDIS_PORT')
  port: number;

  @Environment('REDIS_DATABASE')
  db: number;
}
