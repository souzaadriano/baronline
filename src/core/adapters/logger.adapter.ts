import { LogHandler } from '@/infra/events/handlers/log-handler/log-handler.adapter';
import { LoggerContract } from '../contracts/logger.contract';
import { LogMessage } from '../entities/value-objects/log.object';
import { EventManagerEngine } from '@/infra/events/engine/event-manager.engine';

export class Logger implements LoggerContract {
  private readonly handler = new LogHandler(new EventManagerEngine());
  emit(message: LogMessage): void {
    this.handler.emit(message);
  }
}
