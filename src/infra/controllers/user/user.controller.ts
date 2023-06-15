import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUseCases } from './user-cases.factory';

@Controller('system')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('health')
  healthCheck() {
    return;
  }
}
