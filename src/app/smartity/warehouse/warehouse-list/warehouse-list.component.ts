import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { WarehouseComponent } from '../warehouse.component';

@Component({
    selector: 'warehouse-list-cmp',
    templateUrl: 'warehouse-list.component.html',
    styles: []
})

export class WarehouseListComponent extends BaseList implements OnInit {


    constructor(public loaderService: LoaderService,
        public helperService: HelperService,
        public router: Router,
        private comp: WarehouseComponent) {
        super(loaderService, helperService);
        this.urlApi = '/api/warehouse';
    }

    ngOnInit() {
        this.getAll();
    }

    private CUD(action:string, row?:any){
        this.comp.strAction = action;
        switch (action) {
            case 'Guardar':
                this.comp.id = undefined;
                break;
            default:
                this.comp.id = row.id;
                break;
        }
        this.comp.openActions();
    }
}
