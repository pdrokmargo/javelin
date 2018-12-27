import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseActionComponent } from './warehouse-action/warehouse-action.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: WarehouseComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
        WarehouseComponent,
        WarehouseActionComponent,
        WarehouseListComponent
    ]
})
export class WarehouseModule {
}
