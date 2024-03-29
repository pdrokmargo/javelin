import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { LoaderService, HelperService } from '../../../../shared';
import { BaseList } from '../../../bases/base-list';

@Component({
    selector: 'stakeholders-list-cmp',
    templateUrl: 'stakeholders-list.component.html',
    styles: []
})

export class StakeholdersListComponent extends BaseList implements OnInit {

    @Output() select = new EventEmitter();
    @Input() noaction: boolean;
    @Input() type: string;

    constructor(public router: Router,
        public loaderService: LoaderService,
        public helperService: HelperService
    ) {
        super(loaderService, helperService);

    }

    ngOnInit() {
        console.log(this.type);
        this.urlApi = `/api/search_stake_holder/${this.type}`;
        this.getAll();
    }

    private view(row: any) {
        this.select.emit(row);
    }
}