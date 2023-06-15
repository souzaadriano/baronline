import { EventManagerEngine } from './engine/event-manager.engine';
import { EvenetHandlerConstructor } from './handlers';

export class EventListner {
  private readonly eventManager = new EventManagerEngine();
  constructor(private readonly handlers: EvenetHandlerConstructor[]) {}

  public listen() {
    for (const EventHandler of this.handlers) this.execute(EventHandler);
  }

  private execute(EventHandler: EvenetHandlerConstructor) {
    const eventHandler = new EventHandler(this.eventManager);
    this.eventManager.connection.on(eventHandler.route, (event: any) => {
      eventHandler.handle(event).catch(console.error);
    });
  }
}
