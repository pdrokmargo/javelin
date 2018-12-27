import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UsersComponent } from './users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserActionComponent } from './user-action/user-action.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [{ path: '', component: UsersComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
        UsersComponent,
        UserActionComponent,
        UserListComponent
    ]
})
export class UsersModule {
}
