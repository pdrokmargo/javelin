import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { DeliveryComponent } from '../delivery.component';

@Component({
    selector: "delivery-list-cmp",
    templateUrl: "delivery-list.component.html",
    styles: []
})

export class DeliveryListComponent extends BaseList implements OnInit {

    constructor(
        public router: Router,
        public loaderService: LoaderService,
        public helperService: HelperService,
        private comp: DeliveryComponent
    ) {
        super(loaderService, helperService);
        this.urlApi = '/api/deliveries';
    }

    ngOnInit() {
        this.getAll();
        console.log(this.list);
    }

    private CUD(action:string, row?:any){
        this.comp.strAction = action;
        switch (action) {
            case 'Guardar':
                this.comp.id = undefined;
                break;
            default:
                this.comp.id = row.id;
                break;
        }
        this.comp.openActions();
    }

}