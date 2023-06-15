import { UserEntity } from '../entities/models/user.entity';
import { DateCalc } from '../entities/value-objects/instant.object';
import { Session } from '../entities/value-objects/session.object';

export interface SessionManagerContract {
  create(input: UserEntity): Promise<Session>;
  refresh(session: Session): Promise<void>;
  find(sessionId: string): Promise<Session>;
}
