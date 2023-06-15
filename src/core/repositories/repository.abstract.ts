import { DatabaseConnectionFactory } from '@/infra/database';

export abstract class AbstractRepository {
  private readonly client = DatabaseConnectionFactory.create();

  protected get connection() {
    return this.client.connection;
  }
}
