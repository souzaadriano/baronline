import { HashHandlerContract, MatchInput } from '../contracts/hash-handler.contract';
import { hash, genSalt, compare } from 'bcrypt';

export class HashHandler implements HashHandlerContract {
  public async hash(value: string): Promise<string> {
    const salt = await genSalt(7);
    const hashValue = await hash(value, salt);
    return hashValue;
  }

  public async match(input: MatchInput): Promise<boolean> {
    const { hash, value } = input;
    return await compare(value, hash);
  }
}
