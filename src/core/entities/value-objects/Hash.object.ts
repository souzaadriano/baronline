import { HashHandlerContract } from '@/core/contracts/hash-handler.contract';

export class Hash {
  constructor(private readonly hash: string, public readonly value: string) {}

  async isValid(hashHandler: HashHandlerContract) {
    const isValid = await hashHandler.match({
      hash: this.hash,
      value: this.value,
    });

    if (!isValid) throw new Error('Password not match');
  }
}
