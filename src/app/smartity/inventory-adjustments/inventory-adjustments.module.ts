import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InventoryAdjustmentsComponent } from './inventory-adjustments.component';
import { InventoryAdjustmentsActionComponent } from './inventory-adjustments-action/inventory-adjustments-action.component';
import { InventoryAdjustmentsListComponent } from './inventory-adjustments-list/inventory-adjustments-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: InventoryAdjustmentsComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
        InventoryAdjustmentsComponent,
        InventoryAdjustmentsActionComponent,
        InventoryAdjustmentsListComponent
    ]
})

export class InventoryAdjustmentsModule { }
