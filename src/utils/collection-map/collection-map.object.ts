export class CollectionMap<KEY, VALUE> {
  private readonly data: Map<KEY, VALUE[]>;

  constructor(data?: [key: KEY, value: VALUE[]][]) {
    this.data = new Map<KEY, VALUE[]>(data);
  }

  public get(key: KEY) {
    const value = this.data.get(key);
    if (value) return value;
    throw new Error();
  }

  public set(key: KEY, value: VALUE[]) {
    this.data.set(key, value);
  }

  public append(key: KEY, value: VALUE[]) {
    const content = this.data.get(key);
    if (!content) return this.set(key, value);
    this.set(key, [...content, ...value]);
  }

  public get size() {
    return this.data.size;
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
