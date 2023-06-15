import { UserEntity } from '../models/user.entity';

export class UserDTO {
  public readonly name: string;
  public readonly id: string;
  public readonly email: string;

  constructor(id: string, name: string, email: string) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  public static createFromEntity(user: UserEntity) {
    return new UserDTO(user.id, user.name, user.email);
  }
}
