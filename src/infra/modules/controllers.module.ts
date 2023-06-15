import { Module } from '@nestjs/common';
import { controllers, providers } from '@/Controllers';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers,
  providers,
})
export class ControllersModule {}
