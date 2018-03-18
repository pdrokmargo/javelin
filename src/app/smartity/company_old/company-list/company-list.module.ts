import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { CompanyListComponent } from "./company-list.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: CompanyListComponent }];

@NgModule({
    imports: [
        CommonModule,        
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()  
    ],
    declarations: [
        CompanyListComponent
    ]
})
export class CompanyListModule {
}
