import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../../bases/base-list';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
    selector: 'user-list-cmp',
    templateUrl: 'user-list.component.html',
    styles: []
})

export class UserListComponent extends BaseList implements OnInit {

    @Output() select = new EventEmitter();
    @Input() noaction: boolean;

    constructor(public loaderService: LoaderService,
        public helperService: HelperService,
        public router: Router) {
        super(loaderService, helperService);
        this.urlApi = '/api/users';
    }

    ngOnInit() {
        this.getAll();
    }


    private view(row: any) {
        this.select.emit(row);

    }
}
