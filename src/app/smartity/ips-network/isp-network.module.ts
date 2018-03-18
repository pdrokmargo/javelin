import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IpsNetworkComponent } from './ips-network.component';
import { IpsNetworkListComponent } from './ips-network-list/ips-network-list.component';
import { IpsNetworkActionComponent } from './ips-network-action/ips-network-action.component';

const routes: Routes = [{ path: '', component: IpsNetworkComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()
    ],
    declarations: [
        IpsNetworkComponent,
        IpsNetworkActionComponent,
        IpsNetworkListComponent
    ]
})
export class IpsNetworkModule {
}