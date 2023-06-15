import { EngineContract } from '@/infra/shared/engine.contract';
import { DatabaseConnectionConfig } from './database-connection.config';
import { Client } from 'pg';
import { Singleton } from '@/infra/shared/singleton.decorator';

@Singleton
export class DatabaseConnectionEngine implements EngineContract {
  private readonly configuration = new DatabaseConnectionConfig();
  private client: Client;
  private connected = false;

  async init(): Promise<void> {
    this.client = new Client(this.configuration);
    await this.client.connect();
    this.connected = true;
  }

  public get connection() {
    this.isConnectedOrError();
    return this.client;
  }

  private isConnectedOrError() {
    if (!this.connected) throw new Error('database not connected');
  }
}
