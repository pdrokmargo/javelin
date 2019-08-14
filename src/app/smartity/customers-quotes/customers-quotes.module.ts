import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CustomersQuotesComponent } from './customers-quotes.component';
import { CustomersQuotesActionComponent } from './customers-quotes-action/customers-quotes-action.component';
import { CustomersQuotesListComponent } from './customers-quotes-list/customers-quotes-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: CustomersQuotesComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule.forRoot()
],
declarations: [
  CustomersQuotesComponent,
  CustomersQuotesActionComponent,
  CustomersQuotesListComponent
]
})
export class CustomersQuotesModule { }
