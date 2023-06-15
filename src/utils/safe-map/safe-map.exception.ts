export class KeyNotFoundException extends Error {
  constructor(key: string, name?: string) {
    super(`Key ${key} not found on SafeMap ${name}`);
  }
}
