import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PharmaceuticalDrugComponent } from './pharmaceutical-drug.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PharmaceuticalDrugActionComponent } from './pharmaceutical-drug-action/pharmaceutical-drug-action.component';
import { PharmaceuticalDrugListComponent } from './pharmaceutical-drug-list/pharmaceutical-drug-list.component';
import { MatRippleModule , MatDialogModule, NativeDateModule } from '@angular/material';

const routes: Routes = [{ path: '', component: PharmaceuticalDrugComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot(),
        MatDialogModule,
        NativeDateModule,
        MatRippleModule 
    ],
    declarations: [
        PharmaceuticalDrugComponent,
        PharmaceuticalDrugActionComponent,
        PharmaceuticalDrugListComponent
    ]
})
export class PharmaceuticalDrugModule {
}
