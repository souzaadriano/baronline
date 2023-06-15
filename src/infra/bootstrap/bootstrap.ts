import { ClassConstructor } from '@/utils';
import { EngineContract } from '../shared/engine.contract';

export class Bootstrap {
  private engines: Set<ClassConstructor<EngineContract>>;
  private constructor(engines: ClassConstructor<EngineContract>[]) {
    this.engines = new Set(engines);
  }

  public static createApp(engines: ClassConstructor<EngineContract>[]) {
    return new Bootstrap(engines);
  }

  public async start(handle?: () => Promise<void>) {
    const engines = Array.from(this.engines);
    for (const Engine of engines) await this.init(Engine);
    if (handle) await handle();
  }

  private async init(Engine: ClassConstructor<EngineContract>) {
    const engine = new Engine();
    await engine.init();
    console.log(`[${Engine.name}]: Started`);
  }
}
