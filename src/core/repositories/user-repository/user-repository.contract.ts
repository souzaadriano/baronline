import { UserEntity } from '@/core/entities/models/user.entity';

export interface UserRepositoryContract {
  save(entity: UserEntity): Promise<void>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
