import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MipresComponent } from './mipres.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MipresListComponent } from './mipres-list/mipres-list.component';
import { MipresActionComponent } from './mipres-action/mipres-action.component';

const routes: Routes = [{ path: '', component: MipresComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
        MipresComponent,
        MipresListComponent,
        MipresActionComponent,
    ]
})
export class MipresModule { }
