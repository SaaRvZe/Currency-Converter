import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CurrencyConverterComponent} from "./components/currency-converter/currency-converter.component";
import {
  CurrencyConverterHistoryComponent
} from "./components/currency-converter/currency-converter-history/currency-converter-history.component";

const routes: Routes = [
  { path: 'currency-converter', component: CurrencyConverterComponent },
  { path: 'currency-converter-history', component: CurrencyConverterHistoryComponent },
  { path: '**', redirectTo: 'currency-converter'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
