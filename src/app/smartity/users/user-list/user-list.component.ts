import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { AuthenticationService } from '../../../auth/authentication.service';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { UsersComponent } from '../users.component';

@Component({
    selector: 'user-list-cmp',
    templateUrl: 'user-list.component.html',
    styles: []
})

export class UserListComponent extends BaseList implements OnInit {

    constructor(public loaderService: LoaderService,
                public helperService: HelperService,
                public router: Router,
                private comp: UsersComponent) {
        super(loaderService, helperService);
        this.urlApi = '/api/users';
    }

    ngOnInit() {
        this.getAll();
    }

    private NEW(row: any) {
        this.comp.openActions();
        this.comp.id = undefined;
    }

    private view(row: any) {
        this.comp.openActions();
        this.comp.id = row.id;
    }
}
