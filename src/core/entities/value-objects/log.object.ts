import { JsonDocument, JsonValue } from '../types/json.type';
import { DateHandlerContract } from '@/core/contracts/date-handler.contract';
import { DATE_FORMAT } from '../enums/date-format.enum';
import { Clock } from './clock.object';

export class LogMessage {
  private readonly dateHandler: DateHandlerContract;
  private readonly details = new Map<string, DetailItem>();
  public readonly issuedAt: Clock;
  public readonly message: string;
  public readonly context: string;
  public readonly level: number;

  constructor(input: LogConstructor) {
    this.issuedAt = input.dateHandler.toClock(new Date());
  }

  public setDetail(key: string, value: JsonValue) {
    this.details.set(key, this.makeDetailValue(value));
  }

  public getDetails() {
    return Array.from(this.details.entries()).reduce((details, [key, value]) => {
      details[key] = { ...value };
      return details;
    }, {} as JsonDocument);
  }

  public toObject() {
    return {
      level: this.level,
      context: this.context,
      message: this.message,
      issuedAt: this.issuedAt.toString(DATE_FORMAT.STANDARD),
      details: this.getDetails(),
    };
  }

  private makeDetailValue(value: JsonValue) {
    return { value, at: this.dateHandler.format(new Date(), DATE_FORMAT.STANDARD) };
  }
}

type DetailItem = {
  at: string;
  value: JsonValue;
};

export type LogConstructor = {
  readonly message: string;
  readonly context: string;
  readonly level: number;
  readonly dateHandler: DateHandlerContract;
};
