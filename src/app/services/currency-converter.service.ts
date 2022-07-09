import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Conversion} from "../model/conversion";
import {Rate} from "../model/rate";

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  private _historyKey = 'history';
  host = 'https://api.frankfurter.app';
  private _history: Conversion[] = [];
  constructor(private http: HttpClient ) {
    this._history = JSON.parse(localStorage.getItem(this._historyKey) ?? '[]');
  }

  getCurrencies() {
    return this.http.get(`${this.host}/currencies`);
  }

  getRates(amount: number, from: string, to: string) {
    return this.http.get<Rate>(`${this.host}/latest?amount=${amount}&from=${from}&to=${to}`);
  }

  getCurrencySymbol(amount: number, currency: string) {
    const locale =   navigator.languages != undefined ? navigator.languages[0] : 'en-US';
    return (amount).toLocaleString(locale, { style: 'currency', currency }).trim()
  }

  get history(): Conversion[] {
    return this._history;
  }

  addToHistory(conversion: Conversion) {
    this._history.unshift(conversion);
    localStorage.setItem(this._historyKey, JSON.stringify(this._history));
  }

  clearHistory() {
    this._history = [];
    localStorage.removeItem(this._historyKey);
  }

}
