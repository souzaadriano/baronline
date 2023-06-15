import { DatabaseConnectionEngine } from './database-connection.engine';

export class DatabaseConnectionFactory {
  private constructor() {}

  public static create() {
    return new DatabaseConnectionEngine();
  }
}
