import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { Response } from '@angular/http';
import { BaseList } from '../../../bases/base-list';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
    selector: 'ips-network-list-cmp',
    templateUrl: 'ips-network-list.component.html',
    styles: []
})

export class IpsNetworkListComponent extends BaseList implements OnInit {

    @Output() select = new EventEmitter();
    @Input() noaction: boolean;

    constructor(
        public loaderService: LoaderService,
        public helperService: HelperService) {
        super(loaderService, helperService);
        this.urlApi = '/api/ips-network';
    }

    ngOnInit() {
        this.getAll();
    }


    private view(row: any) {
        this.select.emit(row);
    }

}