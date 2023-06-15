import { EngineContract } from '@/infra/shared/engine.contract';
import { Singleton } from '@/infra/shared/singleton.decorator';
import { EventEmitter } from 'stream';
import { EvenetHandlerConstructor, eventHandlers } from '../handlers';

@Singleton
export class EventManagerEngine implements EngineContract {
  private client: EventEmitter;
  private connected = false;
  async init(): Promise<void> {
    this.client = new EventEmitter();
    this.connected = true;

    const handlers = eventHandlers();
    for (const EventHandler of handlers) this.listen(EventHandler);
  }

  public get connection() {
    this.isConnectedOrError();
    return this.client;
  }

  private isConnectedOrError() {
    if (!this.connected) throw new Error();
  }

  private listen(EventHandler: EvenetHandlerConstructor) {
    const eventHandler = new EventHandler(this);
    this.connection.on(eventHandler.route, async (event) => {
      await eventHandler.handle(event);
    });
    console.log(`[${EventHandler.name}] listening on ${eventHandler.route}`);
  }
}
