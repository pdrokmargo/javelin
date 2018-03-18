import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { OperationscentreActionComponent } from './operationscentre-action/operationscentre-action.component';
import { OperationscentreListComponent } from './operationscentre-list/operationscentre-list.component';
import { OperationscentreComponent } from './operationscentre.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: OperationscentreComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
        OperationscentreComponent,
        OperationscentreActionComponent,
        OperationscentreListComponent
    ]
})
export class OperationscentreModule {
}
