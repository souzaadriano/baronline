export class Email {
  readonly value: string;
  constructor(email: string) {
    this.value = email;
  }

  private static validateEmail(email: string) {}

  public static create(email: string) {
    Email.validateEmail(email);
    return new Email(email);
  }
}
