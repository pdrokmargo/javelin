import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InventoryMovementsOutComponent } from './inventory-movements-out.component';
import { InventoryMovementsOutActionComponent } from './inventory-movements-out-action/inventory-movements-out-action.component';
import { InventoryMovementsOutListComponent } from './inventory-movements-out-list/inventory-movements-out-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: InventoryMovementsOutComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
        InventoryMovementsOutComponent,
        InventoryMovementsOutActionComponent,
        InventoryMovementsOutListComponent
    ]
})
export class InventoryMovementsOutModule { }
