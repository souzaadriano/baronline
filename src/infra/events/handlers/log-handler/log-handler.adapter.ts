import { LogMessage } from '@/core/entities/value-objects/log.object';
import { EventManagerEngine } from '../../engine/event-manager.engine';
import { EventHandlerContract } from '../event-handler.contract';
import { LogConfiguration } from './log-handler.config';
import { LEVEL_TYPE } from './level-type.enum';
import { Paint } from '@/utils/paint/paint.t.utils';
import { Singleton } from '@/infra/shared/singleton.decorator';

@Singleton
export class LogHandler implements EventHandlerContract<LogMessage> {
  readonly route = 'log';
  private readonly configuration = new LogConfiguration();
  private readonly colorSet = {
    [LEVEL_TYPE.ERROR]: Paint.error,
    [LEVEL_TYPE.INFO]: Paint.info,
    [LEVEL_TYPE.WARNING]: Paint.warning,
    [LEVEL_TYPE.SUCCESS]: Paint.success,
  };
  constructor(private readonly eventManager: EventManagerEngine) {}

  emit(message: LogMessage): void {
    const connection = this.eventManager.connection;
    connection.emit(this.route, message);
  }

  async handle(log: LogMessage): Promise<void> {
    if (!this.logLevel(log)) return;
    this.logMessage(log);
  }

  private logMessage(log: LogMessage) {
    if (!this.configuration.message) return;
    const context = this.setColor(log.context, log.level);
    const message = log.message;

    console.log(`[${context}]: ${message}`);
  }

  private setColor(value: string, level: number) {
    return this.colorSet[level] ? this.colorSet[level](value) : value;
  }

  private logLevel(log: LogMessage) {
    if (log.level < this.configuration.level) return false;
    return true;
  }
}
