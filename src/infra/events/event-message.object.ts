export class EventMessage<CONTENT extends {}> {
  private readonly content: CONTENT;
  public readonly issuedAt: Date;
  public readonly route;

  constructor(route: string, content: CONTENT) {
    this.issuedAt = new Date();
    this.content = content;
    this.route = route;
  }

  getContent(): CONTENT {
    return this.content;
  }
}
