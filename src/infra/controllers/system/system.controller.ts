import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';
import { Permission } from '@/infra/modules/auth/permission.decorator';
import { PERMISSION } from '@/core/entities/enums/permission.enum';
import { UserSession } from '@/infra/modules/auth/user-session.decorator';
import { Session } from '@/core/entities/value-objects/session.object';

@Controller('system')
export class SystemController {
  constructor(private readonly service: SystemService) {}

  @Get('health')
  @Permission(PERMISSION.TESTE2)
  healthCheck(@UserSession() session: Session) {
    ode;
    console.log('health-session', session);
    return this.service.healthCheck();
  }
}
