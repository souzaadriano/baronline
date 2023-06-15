import { EnumGenerator } from '@/generators/enum.generator/enum.generator';
import { DatabaseConnectionFactory } from '../database/engine';
import { EnumGeneratorFactory } from '@/generators/enum.generator/enum.generator.factory';

const script = async () => {
  const databaseConnection = DatabaseConnectionFactory.create();
  await databaseConnection.init();

  const generator = EnumGeneratorFactory.factory();
  await generator.generate({
    strategyNames: ['PERMISSION', 'ROLE'],
  });
};

script().catch(console.error);
