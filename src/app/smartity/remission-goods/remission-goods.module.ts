import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { RemissionGoodsComponent } from './remission-goods.component';
import { RemissionGoodsActionComponent } from './remission-goods-action/remission-goods-action.component';
import { RemissionGoodsListComponent } from './remission-goods-list/remission-goods-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: RemissionGoodsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule.forRoot()
],
declarations: [
  RemissionGoodsComponent,
  RemissionGoodsActionComponent,
  RemissionGoodsListComponent
]
})
export class RemissionGoodsModule { }
