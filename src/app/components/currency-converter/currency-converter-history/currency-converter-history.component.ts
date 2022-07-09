import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CurrencyConverterService} from "../../../services/currency-converter.service";
import {Conversion} from "../../../model/conversion";

@Component({
  selector: 'app-currency-converter-history',
  templateUrl: './currency-converter-history.component.html',
  styleUrls: ['./currency-converter-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterHistoryComponent implements OnInit {
  history: Conversion[];

  displayedColumns = ['time', 'from', 'to']
  constructor(private currencyConverterService: CurrencyConverterService) { }

  ngOnInit(): void {
    this.history = this.currencyConverterService.history;
  }

  clearHistory() {
    this.currencyConverterService.clearHistory();
    this.history = this.currencyConverterService.history;
  }

}
