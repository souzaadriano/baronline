import { Environment } from 'environment-variables-decorator';

export class DatabaseConnectionConfig {
  @Environment('DB_HOST')
  host: string;

  @Environment('DB_PASSWORD')
  password: string;

  @Environment('DB_USER')
  user: string;

  @Environment('DB_NAME')
  database: string;

  @Environment('DB_PORT')
  port: number;
}
