import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { BillingComponent } from './billing.component';
import { BillingActionComponent } from './billing-action/billing-action.component';
import { BillingListComponent } from './billing-list/billing-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: BillingComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule.forRoot()
],
declarations: [
  BillingComponent,
  BillingActionComponent,
  BillingListComponent
]
})
export class BillingModule { }
