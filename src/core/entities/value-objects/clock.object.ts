import {
  DateCalculeValue,
  DateHandlerContract,
  DateObject,
  StringDateObject,
} from '@/core/contracts/date-handler.contract';
import { DATE_FORMAT } from '../enums/date-format.enum';

export class Clock {
  private _date: Date;
  private history: string[] = [];
  constructor(date: Date | Clock, private readonly handler: DateHandlerContract) {
    if (date instanceof Clock) this._date = new Date(date._date);
    else this._date = date;
  }

  public get date() {
    return this._date;
  }

  public add(value: DateCalculeValue): this {
    this.addToHistory();
    this._date = this.handler.add(this._date, value);
    return this;
  }

  public sub(value: DateCalculeValue): this {
    this.addToHistory();
    this._date = this.handler.sub(this._date, value);
    return this;
  }

  public toString(format: DATE_FORMAT) {
    return this.handler.format(this._date, format);
  }

  public object(format: 'string'): StringDateObject;
  public object(format: 'number'): DateObject;
  public object(format: 'string' | 'number' = 'number'): DateObject | StringDateObject {
    return this.handler.object(this._date, format);
  }

  public clone() {
    return new Clock(this.toDate(), this.handler);
  }

  public toDate() {
    return new Date(this._date);
  }

  public getHistory(mode: 'clock' | 'date' | 'string' = 'string') {
    if (mode === 'clock') return this.history.map((date) => this.handler.toClock(date, DATE_FORMAT.ISO));
    if (mode === 'date') return this.history.map((date) => new Date(date));
    return [...this.history];
  }

  public isAfter(date: Date | Clock) {
    if (date instanceof Clock) return this.handler.isAfter(this._date, this.date);
    return this.handler.isAfter(this._date, date);
  }

  public isBefore(date: Date | Clock) {
    if (date instanceof Clock) return this.handler.isBefore(this._date, this.date);
    return this.handler.isBefore(this._date, date);
  }

  private addToHistory() {
    this.history.push(this.handler.format(this._date, DATE_FORMAT.STANDARD));
  }
}
