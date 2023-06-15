export class Json<T> {
  constructor(private readonly value: T) {}

  public static parse<T>(content: string, validator?: JsonValidator<T>): T {
    const payload = JSON.parse(content);
    const isValid = validator ? validator(payload) : true;
    if (!isValid) throw new Error();
    return payload;
  }
}

export type JsonValidator<T> = (content?: Partial<T>) => boolean;
