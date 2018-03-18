import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Base } from '../bases/base';
import { LoaderService, HelperService } from '../../shared';
import { Response } from '@angular/http';

@Component({
    selector: 'operationscentre-cmp',
    templateUrl: 'operationscentre.component.html',
    styles: []
})

export class OperationscentreComponent  extends Base implements  OnInit{

    constructor() {
        super();
    }

    ngOnInit() {}

}
