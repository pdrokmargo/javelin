import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AffiliatesComponent } from './affiliates.component';
import { AffiliatesListComponent } from './affiliates-list/affiliates-list.component';
import { AffiliatesActionComponent } from './affiliates-action/affiliates-action.component';

const routes: Routes = [{ path: '', component: AffiliatesComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
        AffiliatesComponent,
        AffiliatesListComponent,
        AffiliatesActionComponent
    ]
})
export class AffiliatesModule {
}