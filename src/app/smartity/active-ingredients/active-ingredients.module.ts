import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveIngredientsComponent } from './active-ingredients.component';
import { ActiveIngredientsListComponent } from './active-ingredients-list/active-ingredients-list.component';
import { ActiveIngredientsActionComponent } from './active-ingredients-action/active-ingredients-action.component';

const routes: Routes = [{ path: '', component: ActiveIngredientsComponent }];

@NgModule({
    imports: [
        CommonModule,        
        RouterModule.forChild(routes),
        SharedModule,
    ],
    declarations: [
        ActiveIngredientsComponent,
        ActiveIngredientsActionComponent,
        ActiveIngredientsListComponent
    ]
})
export class ActiveIngredientsModule {
}