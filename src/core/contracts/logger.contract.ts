import { LogMessage } from '../entities/value-objects/log.object';

export interface LoggerContract {
  emit(message: LogMessage): void;
}
