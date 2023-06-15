import { Timestamp } from 'rxjs';
import { UserDTO } from '../dtos/user.dto';
import { Timestamps } from '../value-objects/timestamps.object';
import { UUID } from '../value-objects/uuid.object';
import { BrandEntity } from './brand.entity';

export class StoreEntity {
  private readonly _id: UUID;
  private readonly _timestamp: Timestamps;
  public readonly name: string;
  private readonly _brandId: UUID;

  constructor(input: StoreEntityConstructor) {
    const { id, brandId, name, updateAt, deletedAt, createdAt } = input;
    this._id = new UUID(id);
    this._timestamp = new Timestamps({ updateAt, deletedAt, createdAt });
    this._brandId = new UUID(brandId);
    this.name = name;
  }

  static create(input: StoreEntityFactory) {
    const { brandId, name } = input;
    const timestamps = Timestamps.factory();
    return new StoreEntity({
      id: UUID.generate(),
      brandId,
      name,
      createdAt: timestamps.createdAt,
      updateAt: timestamps.updateAt,
      deletedAt: timestamps.deletedAt,
    });
  }

  public get brandId() {
    return this._brandId.value;
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

export type StoreEntityFactory = {
  readonly name: string;
  readonly brandId: string;
};

export type StoreEntityConstructor = {
  readonly id: string;
  readonly name: string;
  readonly brandId: string;
  readonly createdAt: Date;
  readonly updateAt: Date;
  readonly deletedAt?: Date;
};
