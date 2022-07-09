import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrencyConverterComponent} from "./currency-converter.component";
import { CurrencyConverterHistoryComponent } from './currency-converter-history/currency-converter-history.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    CurrencyConverterComponent,
    CurrencyConverterHistoryComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class CurrencyConverterModule { }
