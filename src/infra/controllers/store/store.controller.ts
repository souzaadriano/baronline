import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '@/infra/modules/auth/public.decorator';
import { StoreService } from './store.service';
import { CreateStoreSchema } from './schemas/create-store.schema';
import { UserSession } from '@/infra/modules/auth/user-session.decorator';
import { Session } from '@/core/entities/value-objects/session.object';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @Public()
  async signin(@Body() input: CreateStoreSchema, @UserSession() session: Session) {
    const output = await this.storeService.createStore.handle({
      brandId: input.brandId,
      name: input.name,
      session,
    });
    return output;
  }
}
