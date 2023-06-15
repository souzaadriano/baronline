import { DATE_CHUNK } from '../entities/enums/date-chunk.enum';
import { DATE_FORMAT } from '../entities/enums/date-format.enum';
import { TIMEZONE } from '../entities/enums/timezone.enum';
import { Clock } from '../entities/value-objects/clock.object';
import { Instant } from '../entities/value-objects/instant.object';

export interface DateHandlerContract {
  add(date: Date, value: DateCalculeValue): Date;
  sub(date: Date, value: DateCalculeValue): Date;
  format(date: Date, format: DATE_FORMAT, timezone?: TIMEZONE): string;
  parse(dateString: string, format: DATE_FORMAT, timezone?: TIMEZONE): Date;

  object(date: Date, format: 'string'): StringDateObject;
  object(date: Date, format: 'number'): DateObject;
  object(date: Date, format: 'string' | 'number'): DateObject | StringDateObject;

  toClock(date: Clock): Clock;
  toClock(date: Date): Clock;
  toClock(date: string, dateFormat: DATE_FORMAT): Clock;
  toClock(date: Date | Clock | string, dateFormat?: DATE_FORMAT): Clock;

  isAfter(date: Date, value: Date): boolean;
  isBefore(date: Date, value: Date): boolean;
}

export type DateObject = {
  unixTimestamp: number;
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export type StringDateObject = {
  unixTimestamp: string;
  year: string;
  month: string;
  day: string;
  hours: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
};

export type DateCalculeValue = {
  [DATE_CHUNK.MILLISECONDS]?: number;
  [DATE_CHUNK.SECONDS]?: number;
  [DATE_CHUNK.MINUTES]?: number;
  [DATE_CHUNK.HOURS]?: number;
  [DATE_CHUNK.DAYS]?: number;
  [DATE_CHUNK.WEEKS]?: number;
  [DATE_CHUNK.MONTHS]?: number;
  [DATE_CHUNK.YEARS]?: number;
};
