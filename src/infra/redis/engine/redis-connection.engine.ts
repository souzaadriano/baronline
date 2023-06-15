import { EngineContract } from '@/infra/shared/engine.contract';
import { RedisConnectionConfig } from './redis-connection.config';
import { Redis } from 'ioredis';
import { Singleton } from '@/infra/shared/singleton.decorator';

@Singleton
export class RedisConnectorEngine implements EngineContract {
  private readonly configuration = new RedisConnectionConfig();
  private client: Redis;
  private connected = false;

  public async init(): Promise<void> {
    const { host, password, port, db } = this.configuration;
    const client = new Redis({ db, host, port, password, connectionName: 'store_app' });
    console.log('redis say', await client.ping());
    this.client = client;
    this.connected = true;
  }

  public get connection() {
    this.isConnectedOrError();
    return this.client;
  }

  private isConnectedOrError() {
    if (!this.connected) throw new Error();
  }
}
