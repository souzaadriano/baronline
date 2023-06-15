import { DateHandler } from '@/core/adapters/date-handler.adapter';
import { SeedDatabase } from '../database/engine/seed-database.command';

const script = async () => {
  const script = new SeedDatabase();
  await script.run();
};

script()
  .then(() => console.log('execution end'))
  .catch(console.error);
