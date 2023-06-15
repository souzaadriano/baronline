import { EnumGenerator } from './enum.generator';
import { strategies } from './strategies';

export class EnumGeneratorFactory {
  private constructor() {}

  public static factory() {
    return new EnumGenerator({ strategies });
  }
}
