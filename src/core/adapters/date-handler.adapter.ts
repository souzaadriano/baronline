import {
  DateCalculeValue,
  DateHandlerContract,
  DateObject,
  StringDateObject,
} from '../contracts/date-handler.contract';
import { DATE_FORMAT } from '../entities/enums/date-format.enum';
import { TIMEZONE } from '../entities/enums/timezone.enum';
import {
  add,
  sub,
  format,
  parse,
  getDate,
  getYear,
  getMilliseconds,
  getMonth,
  getMinutes,
  getSeconds,
  getHours,
  isAfter,
  isBefore,
} from 'date-fns';
import { Clock } from '../entities/value-objects/clock.object';

export class DateHandler implements DateHandlerContract {
  add(date: Date, value: DateCalculeValue): Date {
    return add(date, value);
  }
  sub(date: Date, value: DateCalculeValue): Date {
    return sub(date, value);
  }

  format(date: Date, dateFormat: DATE_FORMAT, timezone?: TIMEZONE): string {
    return format(date, dateFormat);
  }

  parse(dateString: string, format: DATE_FORMAT, timezone?: TIMEZONE): Date {
    return parse(dateString, format, new Date());
  }

  object(date: Date, format: 'string'): StringDateObject;
  object(date: Date, format: 'number'): DateObject;
  object(date: Date, format?: 'string' | 'number'): DateObject | StringDateObject {
    const props = this.dateAtributes(date);
    if (!format || format === 'number') return props;

    return {
      year: props.year.toString().padStart(2, '0'),
      month: props.month.toString().padStart(2, '0'),
      day: props.day.toString().padStart(2, '0'),
      hours: props.hours.toString().padStart(2, '0'),
      minutes: props.minutes.toString().padStart(2, '0'),
      seconds: props.seconds.toString().padStart(2, '0'),
      milliseconds: props.milliseconds.toString().padStart(2, '0'),
      unixTimestamp: props.unixTimestamp.toString().padStart(2, '0'),
    };
  }

  toClock(date: Clock): Clock;
  toClock(date: Date): Clock;
  toClock(date: string, dateFormat: DATE_FORMAT): Clock;
  toClock(date: Date | Clock | string, dateFormat?: DATE_FORMAT): Clock {
    if (date instanceof Clock) return new Clock(date, this);
    if (date instanceof Date) return new Clock(date, this);
    if (typeof date === 'string') return new Clock(parse(date, dateFormat, new Date()), this);
  }

  isAfter(date: Date, value: Date): boolean {
    return isAfter(date, value);
  }

  isBefore(date: Date, value: Date): boolean {
    return isBefore(date, value);
  }

  private dateAtributes(date: Date) {
    return {
      year: getYear(date),
      month: getMonth(date) + 1,
      day: getDate(date),
      hours: getHours(date),
      minutes: getMinutes(date),
      seconds: getSeconds(date),
      milliseconds: getMilliseconds(date),
      unixTimestamp: date.getTime(),
    };
  }
}
