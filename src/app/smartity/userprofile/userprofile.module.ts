import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UserprofileListComponent } from './userprofile-list/userprofile-list.component';
import { UserprofileActionComponent } from './userprofile-action/userprofile-action.component';
import { UserprofileComponent } from './userprofile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: UserprofileComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
        UserprofileComponent,
        UserprofileListComponent,
        UserprofileActionComponent
    ]
})
export class UserprofileModule {
}
