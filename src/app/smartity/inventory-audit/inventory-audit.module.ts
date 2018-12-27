import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InventoryAuditComponent } from './inventory-audit.component';
import { InventoryAuditActionComponent } from './inventory-audit-action/inventory-audit-action.component';
import { InventoryAuditListComponent } from './inventory-audit-list/inventory-audit-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: InventoryAuditComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
      InventoryAuditComponent,
      InventoryAuditActionComponent,
      InventoryAuditListComponent
    ]
})
export class InventoryAuditModule { }
