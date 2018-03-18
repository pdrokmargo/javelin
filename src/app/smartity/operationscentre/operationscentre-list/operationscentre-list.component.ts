import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { OperationscentreComponent } from '../operationscentre.component';

@Component({
    selector: 'operationscentre-list-cmp',
    templateUrl: 'operationscentre-list.component.html',
    styles: []
})

export class OperationscentreListComponent extends BaseList implements  OnInit{

    constructor(public loaderService: LoaderService, 
                public helperService: HelperService, 
                public router: Router,
                private comp: OperationscentreComponent) {
        super(loaderService, helperService);
        this.urlApi = '/api/operationscentres';
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
