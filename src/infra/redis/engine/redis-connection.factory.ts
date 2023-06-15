import { RedisConnectorEngine } from './redis-connection.engine';

export class RedisConnectionFactory {
  private constructor() {}
  public static factory() {
    return new RedisConnectorEngine();
  }
}
