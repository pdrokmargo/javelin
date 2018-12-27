import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { CompanyComponent } from "./company.component";

const routes: Routes = [{ path: '', component: CompanyComponent }];

@NgModule({
    imports: [
        CommonModule,        
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [
        CompanyComponent
    ]
})
export class CompanyModule {
}
