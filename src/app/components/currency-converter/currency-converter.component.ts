import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyConverterService} from "../../services/currency-converter.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {
  BehaviorSubject,
  debounce,
  interval,
  Observable,
  of, pairwise,
  Subject,
  switchMap,
  takeUntil,
  tap
} from "rxjs";
import {Rate} from "../../model/rate";
import {Conversion} from "../../model/conversion";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  currencyForm: FormGroup;
  currencies = {};
  resultConversion: Conversion | null;
  isLoading = false;
  private _destroy$: Subject<null> = new Subject();
  private _getRate$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  constructor(private currencyConverterService: CurrencyConverterService, private fb: FormBuilder,
              private cdr: ChangeDetectorRef) {
    this.currencyForm = fb.group({
      amount: fb.control(0),
      from: fb.control('USD'),
      to: fb.control('ILS'),
    });
  }

  ngOnInit(): void {
    this.initListeners();
  }

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  initListeners() {
    this.currencyConverterService.getCurrencies().subscribe( currencies => {
      this.currencies = currencies;
      this.currencyForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      this.cdr.detectChanges();
    });

    this.currencyForm.valueChanges.pipe(takeUntil(this._destroy$), pairwise()).subscribe(([oldValue, newValue]) => {
      if(newValue.from ===  newValue.to) {
        if (oldValue.to === newValue.to) {
          this.toControl.setValue(oldValue.from);
        } else {
          this.fromControl.setValue(oldValue.to);
        }
      }

      this.search();
    })

    this._getRate$.pipe(takeUntil(this._destroy$),
      debounce(() => interval(300)),
      switchMap(() => this.getRate()))
      .subscribe(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

  get amountControl() {
    return this.currencyForm.get('amount') as FormControl;
  }

  get toControl() {
    return this.currencyForm.get('to') as FormControl;
  }

  get fromControl() {
    return this.currencyForm.get('from') as FormControl;
  }

  search() {
    this.isLoading = true;
    return this._getRate$.next(null);
  }

  getRate(): Observable<Rate> {
    const amount = this.amountControl.value;

    if(amount <= 0) {
      this.resultConversion = null;
      return of(new Rate());
    }

    const from = this.fromControl.value;
    const to = this.toControl.value;
    return this.currencyConverterService.getRates(amount, from, to)
      .pipe(tap(data => {
        // @ts-ignore
        this.resultConversion = new Conversion(amount, from, to, data.rates[to], new Date());
        this.currencyConverterService.addToHistory(this.resultConversion);
        this.cdr.detectChanges();
      }));
  }
}
