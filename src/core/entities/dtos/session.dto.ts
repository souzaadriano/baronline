import { DateCalc } from '../value-objects/instant.object';
import { UserDTO } from './user.dto';

export type JsonSession = {
  readonly permissions: string[];
  readonly roles: string[];
  readonly user: UserDTO;
  readonly id: string;
  readonly expireAt: string;
  readonly issuedAt: string;
  readonly refreshTime: DateCalc;
};
