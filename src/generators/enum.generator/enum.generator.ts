import { ClassConstructor, SafeMap } from '@/utils';
import { GeneratorContract } from '../generator.contract';
import { enumTemplate } from './enum.template';
import { EnumField, EnumGeneratorStrategyContract } from './strategies/enum-generator.strategy.contract';
import { writeFile } from 'fs/promises';

export class EnumGenerator implements GeneratorContract<EnumGeneratorInput> {
  constructor(private readonly dependencies: Dependencies) {}

  async generate(input: EnumGeneratorInput): Promise<void> {
    const { strategyNames } = input;
    const strategies = this.mapStrategies();
    for (const strategyName of strategyNames) {
      const strategy = strategies.get(strategyName);
      const fields = await strategy.getFields();
      const enumContent = this.stringifyFields(fields);

      const enumFile = enumTemplate(strategy.name, enumContent);
      await this.createFile(strategy, enumFile);
      console.log(`created enum ${strategy.name}`);
    }
  }

  private async createFile(strategy: EnumGeneratorStrategyContract, enumContent: string) {
    const path = `/home/adrianosouza/Projects/bar/baronline/src/${strategy.filePath}/${strategy.fileName}`;
    await writeFile(path, enumContent);
  }

  private mapStrategies() {
    const { strategies } = this.dependencies;
    return new SafeMap(strategies.map((strategy) => [strategy.name, strategy]));
  }

  private stringifyFields(fields: EnumField[]) {
    return fields.map((field) => `${field.key} = ${field.value}`).join(',\n');
  }
}

export type EnumGeneratorInput = { strategyNames: string[] };

type Dependencies = {
  strategies: EnumGeneratorStrategyContract[];
};
