import { SessionManagerContract } from '../contracts/session-manager.contract';
import { Session } from '../entities/value-objects/session.object';
import { UserDTO } from '../entities/dtos/user.dto';
import { SessionRedisKey } from '@/infra/redis/keys/session-key/session.redis-key';
import { UserEntity } from '../entities/models/user.entity';

export class SessionManager implements SessionManagerContract {
  private readonly engine = new SessionRedisKey();

  public async create(user: UserEntity): Promise<Session> {
    console.log('session.manager: create started');
    const session = new Session({
      permissions: user.permissions,
      roles: user.roles,
      user: UserDTO.createFromEntity(user),
      refreshValue: this.engine.refreshConfig,
      expiresIn: this.engine.expireConfig,
    });
    console.log('session.manager: created session', session);
    const sessionKey = this.engine.make(session.id);
    const ttl = this.engine.expireInSeconds();

    await this.engine.redis.set(sessionKey, session.toJson(), 'EX', ttl);
    return session;
  }

  public async refresh(session: Session): Promise<void> {
    const sessionKey = this.engine.make(session.id);
    const ttl = this.engine.refreshInSeconds();
    await this.engine.redis.expire(sessionKey, ttl);
  }

  public async find(sessionId: string): Promise<Session> {
    const sessionKey = this.engine.make(sessionId);
    const sessionString = await this.engine.redis.get(sessionKey);
    const session = Session.createFromJson(sessionString);
    await this.refresh(session);
    return session;
  }
}
