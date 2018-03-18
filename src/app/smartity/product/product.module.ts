import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProductComponent } from './product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductActionComponent } from './product-action/product-action.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MaterialModule, MdDialogModule } from '@angular/material';

const routes: Routes = [{ path: '', component: ProductComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule.forRoot(),
        MdDialogModule,
        MaterialModule
    ],
    declarations: [
        ProductComponent,
        ProductActionComponent,
        ProductListComponent
    ]
})
export class ProductModule {
}
