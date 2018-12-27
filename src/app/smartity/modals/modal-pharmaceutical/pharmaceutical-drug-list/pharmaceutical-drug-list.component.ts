import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { BaseList } from '../../../bases/base-list';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
    selector: 'pharmaceutical-drug-list-cmp',
    templateUrl: 'pharmaceutical-drug-list.component.html',
    styles: []
})

export class PharmaceuticalDrugListComponent extends BaseList implements OnInit {

    @Output() select = new EventEmitter();
    numItemSelected = -1;

    constructor(public router: Router,
        public loaderService: LoaderService,
        public helperService: HelperService) {
        super(loaderService, helperService);
        this.urlApi = '/api/pharmaceuticaldrug';
    }

    ngOnInit() {
        this.getAll();
    }



    private view(row: any) {
        this.select.emit(row);
    }

}
