import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MyProfileComponent } from './my-profile.component';

const routes: Routes = [{ path: '', component: MyProfileComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [
        MyProfileComponent
    ]
})
export class MyProfileModule {
}
