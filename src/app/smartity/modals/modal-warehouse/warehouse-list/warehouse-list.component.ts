import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { BaseList } from '../../../bases/base-list';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
    selector: 'warehouse-list-cmp',
    templateUrl: 'warehouse-list.component.html',
    styles: []
})

export class WarehouseListComponent extends BaseList implements OnInit {

    @Output() select = new EventEmitter();

    constructor(public loaderService: LoaderService,
        public helperService: HelperService,
        public router: Router) {
        super(loaderService, helperService);
        this.urlApi = '/api/warehouse';
    }

    ngOnInit() {
        this.getAll();
    }

   

    private view(row: any) {
        this.select.emit(row);
    }

}
