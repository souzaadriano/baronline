import { Bootstrap } from './infra/bootstrap/bootstrap';
import { DatabaseConnectionEngine } from './infra/database/engine';
import { EventManagerEngine } from './infra/events/engine/event-manager.engine';
import { NestEngine } from './infra/nest/nest.engine';
import { RedisConnectorEngine } from './infra/redis';

const application = Bootstrap.createApp([
  EventManagerEngine,
  DatabaseConnectionEngine,
  RedisConnectorEngine,
  NestEngine,
]);

application.start().catch(console.error);
