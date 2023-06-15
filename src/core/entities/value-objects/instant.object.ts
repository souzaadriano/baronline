import { add, sub, format, parse } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { DATE_FORMAT } from '../enums/date-format.enum';
import { TIMEZONE } from '../enums/timezone.enum';

export class Instant {
  private _date: Date;
  private _history: Date[] = [];

  constructor(date: Date) {
    this._date = new Date(date);
  }

  static create(date: Instant) {
    return date.cloneInstant();
  }

  static now() {
    return new Instant(new Date());
  }

  static parse(date: string, timezone?: TIMEZONE) {
    if (!timezone) return new Instant(parse(date, DATE_FORMAT.STANDARD, new Date()));
    return new Instant(zonedTimeToUtc(date, timezone));
  }

  public get date() {
    return this._date;
  }

  public cloneInstant() {
    return new Instant(this.date);
  }

  public increment(value: DateCalc) {
    this._history.push(new Date(this.date));
    this._date = add(this.date, value);
    return this;
  }

  public decrement(value: DateCalc) {
    this._history.push(new Date(this.date));
    this._date = sub(this.date, value);
    return this;
  }

  public toString(dateFormat?: DATE_FORMAT, timeZone?: TIMEZONE) {
    const date = timeZone ? utcToZonedTime(this._date, timeZone) : this.date;
    return format(date, dateFormat);
  }
}

export enum DATE_CALC {
  MILLISECONDS = 'milliseconds',
  SECONDS = 'seconds',
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
  YEARS = 'years',
}

export type DateCalc = {
  [DATE_CALC.MILLISECONDS]?: number;
  [DATE_CALC.SECONDS]?: number;
  [DATE_CALC.MINUTES]?: number;
  [DATE_CALC.HOURS]?: number;
  [DATE_CALC.DAYS]?: number;
  [DATE_CALC.WEEKS]?: number;
  [DATE_CALC.MONTHS]?: number;
  [DATE_CALC.YEARS]?: number;
};

export const dateCalcValidSet = new Set([
  'milliseconds',
  'seconds',
  'minutes',
  'hours',
  'days',
  'weeks',
  'months',
  'years',
]);
