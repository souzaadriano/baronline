import { UserDTO } from '../dtos/user.dto';
import { BrandConfiguration } from '../value-objects/configurations/brand-configuration.object';
import { Timestamps } from '../value-objects/timestamps.object';
import { UUID } from '../value-objects/uuid.object';

export class BrandEntity {
  private readonly _id: UUID;
  private readonly _timestamp: Timestamps;
  readonly name: string;
  readonly configuration: BrandConfiguration;
  readonly user: UserDTO;

  constructor(input: BrandEntityConstructor) {
    const { id, name, configuration, userEmail, userId, userName, ...timestamp } = input;
    this._id = new UUID(id);
    this.name = name;
    this.configuration = new BrandConfiguration(configuration);
    this.user = new UserDTO(userId, userName, userEmail);
    this._timestamp = new Timestamps(timestamp);
  }

  public static create(input: BrandEntityFactory): BrandEntity {
    const timestamp = Timestamps.factory();
    const { user, name } = input;
    return new BrandEntity({
      id: UUID.generate(),
      configuration: '{}',
      name,
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      createdAt: timestamp.createdAt,
      updateAt: timestamp.updateAt,
      deletedAt: null,
    });
  }

  public get id() {
    return this._id.value;
  }

  public get createdAt() {
    return this._timestamp.createdAt;
  }

  public get updateAt() {
    return this._timestamp.updateAt;
  }

  public get deletedAt() {
    return this._timestamp.deletedAt;
  }
}

export type BrandEntityFactory = {
  readonly name: string;
  readonly user: UserDTO;
};

export type BrandEntityConstructor = {
  readonly id: string;
  readonly name: string;
  readonly configuration: string;
  readonly userName: string;
  readonly userEmail: string;
  readonly userId: string;
  readonly createdAt: Date;
  readonly updateAt: Date;
  readonly deletedAt?: Date;
};
