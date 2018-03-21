import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { Response } from '@angular/http';
import { BaseList } from '../../../bases/base-list';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
    selector: 'stakeholders-list-cmp',
    templateUrl: 'stakeholders-list.component.html',
    styles: []
})

export class StakeholdersListComponent extends BaseList implements OnInit {

    @Output() select = new EventEmitter();
    @Input() noaction: boolean;
    @Input() type: string;

    constructor(
        public loaderService: LoaderService,
        public helperService: HelperService) {
        super(loaderService, helperService);





    }

    ngOnInit() {
        console.log(this.type);
        if (this.type != '') {
            switch (this.type) {
                case 'custumers':
                    this.urlApi = '/api/stakeholders-custumers';
                    break;
            }
            this.getAll();
        } else {
            this.urlApi = '/api/stakeholders';
            this.getAll();
        }

    }



    private view(row: any) {
        this.select.emit(row);
    }
}
