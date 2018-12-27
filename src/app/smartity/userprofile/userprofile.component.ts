import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Base } from '../bases/base';

@Component({
    selector: 'userprofile-cmp',
    templateUrl: 'userprofile.component.html',
    styles: []
})

export class UserprofileComponent extends Base implements OnInit {

    /**
     *
     */
    constructor() {
        super();
    }

    ngOnInit(){ }

}
