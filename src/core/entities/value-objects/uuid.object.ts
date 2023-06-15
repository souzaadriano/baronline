import { randomUUID } from 'crypto';

export class UUID {
  constructor(public readonly value: string) {}

  static factory() {
    return new UUID(randomUUID());
  }

  static generate() {
    return randomUUID();
  }
}
