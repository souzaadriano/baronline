import { ClassConstructor } from '@/utils/class-constructor.type';

export class AdapterFactory {
  private static readonly adapters = new Map<string, any>();

  public static factory(Adapter: ClassConstructor) {
    if (AdapterFactory.adapters.has(Adapter.name)) return;
    const adapter = new Adapter();
    AdapterFactory.adapters.set(Adapter.name, adapter);
  }

  public static get<T>(Adapter: ClassConstructor<T>): T {
    const adapter = AdapterFactory.adapters.get(Adapter.name);
    if (!adapter) AdapterFactory.factory(Adapter);
    return AdapterFactory.adapters.get(Adapter.name);
  }
}
