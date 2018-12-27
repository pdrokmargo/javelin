import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersQuotesComponent } from './suppliers-quotes.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuppliersQuotesActionComponent } from './suppliers-quotes-action/suppliers-quotes-action.component';
import { SuppliersQuotesListComponent } from './suppliers-quotes-list/suppliers-quotes-list.component';

const routes: Routes = [{ path: '', component: SuppliersQuotesComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    SuppliersQuotesComponent,
    SuppliersQuotesActionComponent,
    SuppliersQuotesListComponent,
  ]
})
export class SuppliersQuotesModule { }