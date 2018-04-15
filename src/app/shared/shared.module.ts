import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { EqualValidatorDirective } from "../smartity/directive/equal-validator.directive";
import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';
import { DataTableModule } from 'angular-4-data-table';
import { LrvDataTableModule } from '../smartity/lrv-data-table/lrv-data-table.module';
import { UserEmailValid } from '../smartity/directive/user-email-valid.directive';


@NgModule({
  imports: [
    DataTableModule,
    LrvDataTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EChartsDirective,
    SlimScrollDirective,
    EqualValidatorDirective,
    UserEmailValid,
  ],
  exports: [
    EChartsDirective,
    SlimScrollDirective,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EqualValidatorDirective,
    LrvDataTableModule,  
    UserEmailValid,
  ]
})

export class SharedModule { }
