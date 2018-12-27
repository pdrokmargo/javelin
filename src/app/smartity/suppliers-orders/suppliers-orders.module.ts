import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuppliersOrdersComponent } from './suppliers-orders.component';
import { SuppliersOrdersActionComponent } from './suppliers-orders-action/suppliers-orders-action.component';
import { SuppliersOrdersListComponent } from './suppliers-orders-list/suppliers-orders-list.component';

const routes: Routes = [{ path: '', component: SuppliersOrdersComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    SuppliersOrdersComponent,
    SuppliersOrdersActionComponent,
    SuppliersOrdersListComponent,
  ]
})
export class SuppliersOrdersModule { }