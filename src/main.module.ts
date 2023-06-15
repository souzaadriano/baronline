import { Module } from '@nestjs/common';
import { ControllersModule } from '@/Modules';

@Module({
  imports: [ControllersModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
