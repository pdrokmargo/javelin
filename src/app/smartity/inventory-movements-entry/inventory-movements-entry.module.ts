import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InventoryMovementsEntryComponent } from './inventory-movements-entry.component';
import { InventoryMovementsEntryActionComponent } from './inventory-movements-entry-action/inventory-movements-entry-action.component';
import { InventoryMovementsEntryListComponent } from './inventory-movements-entry-list/inventory-movements-entry-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: InventoryMovementsEntryComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
        InventoryMovementsEntryComponent,
        InventoryMovementsEntryActionComponent,
        InventoryMovementsEntryListComponent
    ]
})
export class InventoryMovementsEntryModule { }
