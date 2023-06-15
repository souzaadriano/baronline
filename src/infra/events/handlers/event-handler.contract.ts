import { EventMessage } from '../event-message.object';

export interface EventHandlerContract<MESSAGE extends {}> {
  readonly route: string;
  emit(message: MESSAGE): void;
  handle(event: MESSAGE): Promise<void>;
}
