import { DatabaseConnectionFactory } from './database-connection.factory';
import { seeds } from '../seeds';

export class SeedDatabase {
  async run() {
    const engine = DatabaseConnectionFactory.create();
    await engine.init();

    for (const Seeder of seeds) {
      const seeder = new Seeder();
      console.log(`seeding ${Seeder.name}`);
      await seeder.seed();
    }
  }
}
