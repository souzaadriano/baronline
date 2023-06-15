import { KeyNotFoundException } from './safe-map.exception';

export class SafeMap<KEY, VALUE> {
  private readonly data: Map<KEY, VALUE>;
  private readonly mapName?: string;

  constructor(data?: [key: KEY, value: VALUE][], name?: string) {
    this.data = new Map<KEY, VALUE>(data);
    this.mapName = name;
  }

  public get(key: KEY) {
    const value = this.data.get(key);
    if (value) return value;
    throw new KeyNotFoundException(key.toString(), this.name);
  }

  public get name() {
    return this.mapName;
  }

  public set(key: KEY, value: VALUE) {
    this.data.set(key, value);
  }

  public get size() {
    return this.data.size;
  }

  public forEach(handler: ForEachHandler<KEY, VALUE, Map<KEY, VALUE>>) {
    return this.data.forEach(handler);
  }

  public get content() {
    return Array.from(this.data.entries());
  }

  public get values() {
    return Array.from(this.data.values());
  }

  public get keys() {
    return Array.from(this.data.keys());
  }

  public has(key: KEY) {
    this.data.has(key);
  }

  public delete(key: KEY) {
    this.data.delete(key);
  }
}

type ForEachHandler<KEY, VALUE, MAP> = (value: VALUE, key: KEY, map: MAP) => void;
