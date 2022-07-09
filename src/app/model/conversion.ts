export class Conversion {
  amount: number;
  from: string;
  to: string;
  rate: number;
  date: Date;

  constructor(amount: number, from: string, to: string, rate: number, date: Date) {
    this.amount = amount;
    this.from = from;
    this.to = to;
    this.rate = rate;
    this.date = date;
  }
}
