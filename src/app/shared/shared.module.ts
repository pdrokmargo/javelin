import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatRadioModule,
    MatDialogModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatNativeDateModule,
  MatMenuModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatIconModule,
  } from '@angular/material';
import { EqualValidatorDirective } from "../smartity/directive/equal-validator.directive";
import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';
import { DataTableModule } from 'angular-4-data-table/src/index';
import { LrvDataTableModule } from '../smartity/lrv-data-table/lrv-data-table.module';
import { UserEmailValid } from '../smartity/directive/user-email-valid.directive';
import { MycurrencyDirective } from '../smartity/directive/currency.directive';
import { NumberOnlyDirective } from '../smartity/directive/number-only.directive';
 

@NgModule({
  imports: [
    DataTableModule,
    LrvDataTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule
  ],
  declarations: [
    EChartsDirective,
    SlimScrollDirective,
    EqualValidatorDirective,
    UserEmailValid,
    MycurrencyDirective,
    NumberOnlyDirective,
    
  ],
  exports: [
    EChartsDirective,
    SlimScrollDirective,
    // DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    EqualValidatorDirective,
    LrvDataTableModule,  
    UserEmailValid,
    MycurrencyDirective,
    NumberOnlyDirective,
    MatRadioModule,
    MatDialogModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatNativeDateModule,
  MatMenuModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatIconModule,
  ]
})

export class SharedModule { }
