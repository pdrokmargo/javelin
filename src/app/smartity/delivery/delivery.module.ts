import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryComponent } from './delivery.component';
import { DeliveryActionComponent } from './delivery-action/delivery-action.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';

const routes: Routes = [{ path: '', component: DeliveryComponent }];

@NgModule({
    imports: [
        CommonModule,        
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()  
    ],
    declarations: [
        DeliveryComponent,
        DeliveryActionComponent,
        DeliveryListComponent
    ]
})
export class DeliveryModule {
}