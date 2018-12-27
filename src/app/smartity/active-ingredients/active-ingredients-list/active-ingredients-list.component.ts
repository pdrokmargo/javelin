import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { ActiveIngredientsComponent } from '../active-ingredients.component';

@Component({
    selector: "active-ingredients-list-cmp",
    templateUrl: "active-ingredients-list.component.html",
    styles: []
})

export class ActiveIngredientsListComponent extends BaseList implements OnInit {

    @Output() select = new EventEmitter();
    @Input() noaction: boolean;

    constructor(public router: Router,
        public loaderService: LoaderService,
        public helperService: HelperService,
        private comp: ActiveIngredientsComponent) {

        super(loaderService, helperService);
        this.urlApi = '/api/active-ingredients';
    }

    ngOnInit() {
        this.getAll();
    }

    private NEW(row: any) {
        this.comp.openActions();
        this.comp.id = '';
    }

    private view(row: any) {
        if (this.noaction) {
            this.select.emit(row);
        }
        this.comp.id = row.id;
        this.comp.openActions();
    }

}