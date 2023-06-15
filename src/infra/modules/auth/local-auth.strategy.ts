//local.auth.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninSchema } from '@/infra/controllers/root/schemas';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(input: SigninSchema): Promise<any> {
    const userToken = await this.authService.handle(input);
    if (!userToken) throw new UnauthorizedException();
    return userToken;
  }
}
