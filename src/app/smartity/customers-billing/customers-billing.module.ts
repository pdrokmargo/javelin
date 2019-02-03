import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersBillingListComponent } from './customers-billing-list/customers-billing-list.component';
import { CustomersBillingActionComponent } from './customers-billing-action/customers-billing-action.component';
import { CustomersBillingComponent } from './customers-billing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CustomersBillingComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    CustomersBillingComponent,
    CustomersBillingActionComponent,
    CustomersBillingListComponent,
  ]
})
export class CustomersBillingModule { }
