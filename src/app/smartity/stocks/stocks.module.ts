import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { StocksComponent } from './stocks.component';
import { StocksListComponent } from './stocks-list/stocks-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: StocksComponent }];

@NgModule({
  imports: [
    CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
  ],
  declarations: [
    StocksComponent,
    StocksListComponent
  ]
})
export class StocksModule { }

