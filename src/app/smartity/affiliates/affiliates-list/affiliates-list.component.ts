import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { MdSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { AffiliatesComponent } from '../affiliates.component';

@Component({
    selector: "affiliates-list-cmp",
    templateUrl: "affiliates-list.component.html",
})

export class AffiliatesListComponent extends BaseList implements OnInit {

    constructor(public router: Router,
        public loaderService: LoaderService,
        public helperService: HelperService,
        private comp: AffiliatesComponent) {
        super(loaderService, helperService);
        this.urlApi = '/api/affiliates';
    }

    ngOnInit() {
        this.getAll();
    }

    private NEW(row: any) {
        this.comp.openActions();
        this.comp.id = '';
        this.comp.strAction = 'Guardar';
    }

    private view(row: any, action: string) {
        this.comp.id = row.id;
        this.comp.strAction = action;
        this.comp.openActions();
    }

}