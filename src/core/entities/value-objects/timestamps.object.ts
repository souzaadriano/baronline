export class Timestamps {
  constructor(private readonly timestamp: TimestampsConstructor) {}

  public static factory(deleted?: Date) {
    const now = new Date();
    return new Timestamps({
      createdAt: now,
      updateAt: now,
      deletedAt: deleted ? deleted : null,
    });
  }

  public get createdAt() {
    return this.timestamp.createdAt;
  }
  public get updateAt() {
    return this.timestamp.updateAt;
  }
  public get deletedAt() {
    return this.timestamp.deletedAt;
  }
}

export type TimestampsConstructor = {
  createdAt: Date;
  updateAt: Date;
  deletedAt?: Date;
};
