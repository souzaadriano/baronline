import { Environment } from 'environment-variables-decorator';

export class NestServerConfiguration {
  @Environment('APP_PORT')
  port: number;

  @Environment('APP_NAME')
  name: string;
}
