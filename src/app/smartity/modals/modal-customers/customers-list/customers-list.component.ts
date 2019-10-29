import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MatSnackBar } from '@angular/material';
import { Response } from '@angular/http';
import { BaseList } from '../../../bases/base-list';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
    selector: 'customers-list-cmp',
    templateUrl: 'customers-list.component.html',
    styles: []
})

export class CustomersListComponent extends BaseList implements OnInit {

    @Output() select = new EventEmitter();
    @Input() type: string;
    numItemSelected = -1;

    constructor(
        public loaderService: LoaderService,
        public helperService: HelperService) {
        super(loaderService, helperService);
    }

    ngOnInit() {
        console.log(this.type);
        if (this.type != '') {
            switch (this.type) {
                case 'customers':
                    this.urlApi = '/api/stakeholders-custumers';
                    break;
            }
            this.getAll();
        } else {
            this.urlApi = '/api/stakeholders-custumers';
            this.getAll();
        }

    }



    private view(row: any) {
        this.select.emit(row);
    }
}
