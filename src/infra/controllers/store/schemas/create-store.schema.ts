import { IsString, IsUUID } from 'class-validator';

export class CreateStoreSchema {
  @IsString()
  name: string;

  @IsUUID()
  brandId: string;
}
