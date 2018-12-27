import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CompanyComponent } from './company.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyActionComponent } from './company-action/company-action.component';
import { CompanyListComponent } from './company-list/company-list.component';

const routes: Routes = [{ path: '', component: CompanyComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule.forRoot()
  ],
  declarations: [CompanyComponent, CompanyActionComponent, CompanyListComponent]
})
export class CompanyModule {}
