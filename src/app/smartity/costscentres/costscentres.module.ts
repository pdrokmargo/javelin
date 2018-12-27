import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { CostscentresComponent } from "./costscentres.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CostscentresActionComponent } from "./costscentres-action/costscentres-action.component";
import { CostscentresListComponent } from "./costscentres-list/costscentres-list.component";

const routes: Routes = [{ path: '', component: CostscentresComponent }];

@NgModule({
    imports: [
        CommonModule,        
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot()  
    ],
    declarations: [
        CostscentresComponent,
        CostscentresActionComponent,
        CostscentresListComponent
    ]
})
export class CostscentresModule {
}
