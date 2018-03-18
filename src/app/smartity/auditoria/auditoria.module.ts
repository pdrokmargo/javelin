import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuditoriaComponent } from './auditoria.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [ { path: '', component: AuditoriaComponent } ];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
        AuditoriaComponent
    ]
})

export class AuditoriaModule {
}
