import { CreateSessionOutput } from '@/core/use-cases/create-session/create-session.use-case';
import { SigninSchema } from '@/infra/controllers/root/schemas';
import { CreateSessionFactory } from '@/infra/factories/use-cases/create-session.factory';
import { GetSessionUseCaseFactory } from '@/infra/factories/use-cases/get-session.factory';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';

@Injectable()
export class AuthService {
  private readonly SECRET = 'dSAIODJASIODjsAIOJDSa';
  private readonly createSession = CreateSessionFactory.factory();
  private readonly getSession = GetSessionUseCaseFactory.factory();
  constructor(private jwtService: JwtService) {}

  public async handle(input: SigninSchema) {
    try {
      const session = await this.createSession.handle(input);
      return this.generateToken(session);
    } catch (error) {
      console.error('Failed on auth user session', error);
      throw new UnauthorizedException('Invalid Email or Password');
    }
  }

  public async retrieveSession(token?: string) {
    if (!token) throw new UnauthorizedException();
    try {
      const { sessionId, userId } = await this.jwtService.verifyAsync(token, { secret: this.SECRET });
      return await this.getSession.handle({ sessionId, userId });
    } catch (error) {
      console.error('invalid token', error);
      throw new UnauthorizedException();
    }
  }

  private async generateToken(session: CreateSessionOutput) {
    return {
      id: session.userId,
      email: session.userEmail,
      name: session.userName,
      token: this.jwtService.sign(
        {
          sessionId: session.sessionId,
          userId: session.userId,
        },
        {
          secret: this.SECRET,
        },
      ),
    };
  }
}
