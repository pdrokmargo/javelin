import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../shared';
import { Response } from '@angular/http';
import { Base } from '../bases/base';

@Component({
    selector: 'company-cmp',
    templateUrl: 'company.component.html',
    styles: []
})

export class CompanyComponent extends Base implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() { }

}
