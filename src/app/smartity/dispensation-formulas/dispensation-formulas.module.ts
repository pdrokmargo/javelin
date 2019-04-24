import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DispensationFormulasComponent } from './dispensation-formulas.component';
import { DispensationFormulasListComponent } from './dispensation-formulas-list/dispensation-formulas-list.component';
import { DispensationFormulasActionComponent } from './dispensation-formulas-action/dispensation-formulas-action.component';

const routes: Routes = [{ path: '', component: DispensationFormulasComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
      DispensationFormulasComponent,
      DispensationFormulasActionComponent,
      DispensationFormulasListComponent
    ]
})
export class InventoryAuditModule { }
