import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryContractsComponent } from './delivery-contracts.component';
import { DeliveryContractsActionComponent } from './delivery-contracts-action/delivery-contracts-action.component';
import { DeliveryContractsListComponent } from './delivery-contracts-list/delivery-contracts-list.component';

const routes: Routes = [{ path: '', component: DeliveryContractsComponent }];

@NgModule({
    imports: [
        CommonModule,        
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()  
    ],
    declarations: [
        DeliveryContractsComponent,
        DeliveryContractsActionComponent,
        DeliveryContractsListComponent
    ]
})
export class DeliveryContractsModule {
}
