import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { BaseList } from '../../../bases/base-list';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
    selector: 'stakeholder-list-cmp',
    templateUrl: 'stakeholder-list.component.html',
    styles: []
})

export class StakeholderListComponent extends BaseList implements OnInit {

    @Input() option: string;
    @Output() select = new EventEmitter();
    numItemSelected = -1;

    constructor(public router: Router,
        public loaderService: LoaderService,
        public helperService: HelperService) {
        super(loaderService, helperService);

    }

    ngOnInit() {
        this.urlApi = `/api/search_stake_holder/${this.option}`;
        this.getAll();
    }

    private view(row: any) {
        this.select.emit(row);
    }

}
