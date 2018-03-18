import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { EqualValidatorDirective } from "../smartity/directive/equal-validator.directive";
import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';
import { DataTableModule } from 'angular-4-data-table';
import { LrvDataTableModule } from '../smartity/lrv-data-table/lrv-data-table.module';


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
    EqualValidatorDirective
  ],
  exports: [
    EChartsDirective,
    SlimScrollDirective,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EqualValidatorDirective,
    LrvDataTableModule
  ]
})

export class SharedModule { }
