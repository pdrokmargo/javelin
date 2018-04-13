import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { MdSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { DeliveryPointsComponent } from '../delivery-points.component';

@Component({
    selector: "delivery-points-list-cmp",
    templateUrl: "delivery-points-list.component.html",
})

export class DeliveryPointsListComponent extends BaseList implements OnInit {

    @Output() select = new EventEmitter();

    constructor(
        public router: Router, 
        public loaderService: LoaderService, 
        public helperService: HelperService, 
        private comp: DeliveryPointsComponent
    ) {
        
        super(loaderService, helperService);
        
        this.urlApi = '/api/delivery-points';
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