import { PERMISSION } from '@/core/entities/enums/permission.enum';
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const Permission = (...permissions: PERMISSION[]) => SetMetadata(PERMISSIONS_KEY, permissions);
