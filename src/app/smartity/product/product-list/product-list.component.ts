import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { ProductComponent } from '../product.component';

@Component({
    selector: 'product-list-cmp',
    templateUrl: 'product-list.component.html',
    styles: []
})

export class ProductListComponent  extends BaseList implements  OnInit{

    constructor(public router: Router,
                public loaderService: LoaderService, 
                public helperService: HelperService,
                private comp: ProductComponent) {
        super(loaderService, helperService);
        this.urlApi = '/api/product';
    }

    ngOnInit() {
        this.getAll();
    }

    private NEW(row: any) {
        this.comp.openActions();
        this.comp.id = 0;
    }

    private view(row: any) {
        this.comp.openActions();
        this.comp.id = row.id;
    }

}
