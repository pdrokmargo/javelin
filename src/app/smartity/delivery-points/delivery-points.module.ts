import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryPointsComponent } from './delivery-points.component';
import { DeliveryPointsListComponent } from './delivery-points-list/delivery-points-list.component';
import { DeliveryPointsActionComponent } from './delivery-points-action/delivery-points-action.component';

const routes: Routes = [{ path: '', component: DeliveryPointsComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()  
    ],
    declarations: [
        DeliveryPointsComponent,
        DeliveryPointsActionComponent,
        DeliveryPointsListComponent
    ]
})
export class DeliveryPointsModule {
}