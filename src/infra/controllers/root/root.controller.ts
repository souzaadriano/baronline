import { Body, Controller, Get, Post } from '@nestjs/common';
import { RootService } from './root.service';
import { SigninSchema } from './schemas';
import { AuthService } from '@/infra/modules/auth/auth.service';
import { Public } from '@/infra/modules/auth/public.decorator';

@Controller()
export class RootController {
  constructor(private readonly service: RootService, private readonly authService: AuthService) {}

  @Post('signin')
  @Public()
  async signin(@Body() input: SigninSchema) {
    console.log('called');
    console.log(input);
    const output = await this.authService.handle(input);
    return output;
  }
}
