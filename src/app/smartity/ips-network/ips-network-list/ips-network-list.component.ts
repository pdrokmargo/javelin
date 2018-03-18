import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { IpsNetworkComponent } from '../ips-network.component';

@Component({
    selector: 'ips-network-list-cmp',
    templateUrl: 'ips-network-list.component.html',
    styles: []
})

export class IpsNetworkListComponent extends BaseList implements OnInit {

    @Output() select = new EventEmitter();
    @Input() noaction: boolean;

    constructor(public router: Router,
        public loaderService: LoaderService,
        public helperService: HelperService,
        private comp: IpsNetworkComponent) {
        super(loaderService, helperService);
        this.urlApi = '/api/ips-network';
    }

    ngOnInit() {
        this.getAll();
    }

    private NEW(row: any) {
        this.comp.openActions();
        this.comp.id = 0;
    }

    private view(row: any) {
        if (this.noaction) {
            this.select.emit(row);
        } else {
            this.comp.openActions();
            this.comp.id = row.id;
        }

    }

}