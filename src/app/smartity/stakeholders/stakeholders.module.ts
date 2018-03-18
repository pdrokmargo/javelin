import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { StakeholdersComponent } from "./stakeholders.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StakeholdersActionComponent } from "./stakeholders-action/stakeholders-action.component";
import { StakeholdersListComponent } from "./stakeholders-list/stakeholders-list.component";
import { MdDialogModule } from '@angular/material';

const routes: Routes = [{ path: '', component: StakeholdersComponent }];

@NgModule({
    imports: [
        CommonModule,        
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot(),
        MdDialogModule      
    ],
    declarations: [
        StakeholdersComponent,
        StakeholdersActionComponent,
        StakeholdersListComponent
    ]
    
})
export class StakeholdersModule {
}
