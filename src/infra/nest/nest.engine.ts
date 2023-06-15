import { MainModule } from '@/main.module';
import { NestServerConfiguration } from './nest.config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EngineContract } from '../shared/engine.contract';

export class NestEngine implements EngineContract {
  private readonly configuration = new NestServerConfiguration();

  async init(): Promise<void> {
    const app = await NestFactory.create(MainModule);
    app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: true,
      }),
    );
    await app.listen(this.configuration.port);
  }
}
