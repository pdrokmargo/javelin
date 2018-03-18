import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { StakeholdersComponent } from '../stakeholders.component';

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
        public helperService: HelperService,
        private comp: StakeholdersComponent) {
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

    private NEW(row: any) {
        this.comp.openActions();
        this.comp.id = 0;
    }

    private view(row: any) {
        if (this.noaction) {
            this.select.emit(row);
        }
        this.comp.openActions();
        this.comp.id = row.id;
    }
}
