import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../bases/base-list';
import { LoaderService, HelperService } from '../../shared';
import { Response } from '@angular/http';

@Component({
    selector: 'auditoria-cmp',
    templateUrl: 'auditoria.component.html',
    styles: []
})

export class AuditoriaComponent  extends BaseList implements  OnInit{

    constructor(public loaderService: LoaderService,
                public helperService: HelperService,
                public router: Router) {
        super(loaderService, helperService);
        this.urlApi = '/api/audit';
    }

    ngOnInit() {
        this.getAll();
    }

}
