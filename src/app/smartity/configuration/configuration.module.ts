import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ConfigurationComponent } from "./configuration.component";


const routes: Routes = [{ path: '', component: ConfigurationComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [
        ConfigurationComponent
    ]
})
export class ConfigurationModule {
}
