import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LrvTableComponent } from './lrv-table/lrv-table.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    LrvTableComponent
  ],
  exports: [
    LrvTableComponent
  ]
})
export class LrvDataTableModule { }
