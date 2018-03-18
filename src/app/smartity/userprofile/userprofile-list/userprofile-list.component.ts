import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { UserprofileComponent } from '../userprofile.component';

@Component({
    selector: 'userprofile-list-cmp',
    templateUrl: 'userprofile-list.component.html',
    styles: []
})

export class UserprofileListComponent  extends BaseList implements  OnInit{

    constructor(public loaderService: LoaderService,
                public helperService: HelperService,
                public router: Router,
                private comp: UserprofileComponent) {
        super(loaderService, helperService);
        this.urlApi = '/api/userprofile';

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
