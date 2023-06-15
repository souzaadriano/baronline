export class HashMap<KEY, VALUE> {
  private readonly data: Map<KEY, HashMapValue<VALUE>>;

  constructor(data?: [key: KEY, value: HashMapValue<VALUE>][]) {
    this.data = new Map<KEY, HashMapValue<VALUE>>(data);
  }

  public get(key: KEY) {
    const value = this.data.get(key);
    if (value) return value;
    throw new Error();
  }

  public getContent(key: KEY, item: string): VALUE | undefined {
    const content = this.get(key);
    return content[item];
  }

  public set(key: KEY, value: HashMapValue<VALUE>) {
    this.data.set(key, value);
  }

  public get size() {
    return this.data.size;
  }

  public forEach(handler: ForEachHandler<KEY, VALUE, Map<KEY, HashMapValue<VALUE>>>) {
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

  public contentValues(key: KEY, item: string) {
    const content = this.get(key);
    return Object.values(content[item]);
  }

  public contentKeys(key: KEY, item: string) {
    const content = this.get(key);
    return Object.keys(content[item]);
  }

  public has(key: KEY) {
    this.data.has(key);
  }

  public hasContent(key: KEY, item: string) {
    const content = this.data.get(key);
    if (!content) return false;
    return content[item] ? true : false;
  }

  public append(key: KEY, value: HashMapValue<VALUE>) {
    const content = this.data.get(key);
    if (!content) this.data.set(key, value);
    this.appendToKey(content, value);
  }

  public delete(key: KEY) {
    this.data.delete(key);
  }

  public deleteContent(key: KEY, item: string) {
    const content = this.get(key);
    delete content[item];

    this.set(key, content);
  }

  private appendToKey(content: HashMapValue<VALUE>, value: HashMapValue<VALUE>) {
    Object.entries(value).forEach(([key, data]) => {
      content[key] = data;
    });
  }
}

type HashMapValue<CONTENT> = { [k: string]: CONTENT };
type ForEachHandler<KEY, VALUE, MAP> = (value: HashMapValue<VALUE>, key: KEY, map: MAP) => void;
