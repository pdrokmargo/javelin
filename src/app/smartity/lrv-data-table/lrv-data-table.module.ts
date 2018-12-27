import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LrvTableComponent } from './lrv-table/lrv-table.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatRippleModule  } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule ,
  ],
  declarations: [
    LrvTableComponent
  ],
  exports: [
    LrvTableComponent
  ]
})
export class LrvDataTableModule { }
