import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { DeliveryContractsComponent } from '../delivery-contracts.component';

@Component({
    selector: "delivery-contracts-list-cmp",
    templateUrl: "delivery-contracts-list.component.html",
    styles: []
})

export class DeliveryContractsListComponent extends BaseList implements OnInit {

    constructor(
        public router: Router,
        public loaderService: LoaderService,
        public helperService: HelperService,
        private comp: DeliveryContractsComponent
    ) {
        super(loaderService, helperService);
        this.urlApi = '/api/delivery-contracts';
    }

    ngOnInit() {
        this.getAll();
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