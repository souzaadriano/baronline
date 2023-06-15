import { Environment } from 'environment-variables-decorator';

export class LogConfiguration {
  @Environment('LOG_DETAILS')
  details: boolean;

  @Environment('LOG_MESSAGE')
  message: boolean;

  @Environment('LOG_LEVEL')
  level: number;
}
