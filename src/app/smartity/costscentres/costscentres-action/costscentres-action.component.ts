import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { AuthenticationService } from "../../../auth/authentication.service";
import { MdSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel } from '../../bases/base-model';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { CostscentresComponent } from '../costscentres.component';

@Component({
    selector: "costscentres-action-cmp",
    templateUrl: "costscentres-action.component.html",
    styles: []
})

export class CostscentresActionComponent extends BaseModel implements OnInit {

    private tipos: Array<any> = [];
    private costs_centres_groups: Array<any> = [];
    private costs_centres_types: Array<any> = [];
    private operations_costs_centres: Array<any> = [];

    constructor(
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: CostscentresComponent
    ) {
        super();

    }

    ngOnInit() {

        this.clean();
        this.getCollection();
        this.getCostCentres();

        if (this.numId !== undefined) {
            this.getDataById();
        }
    }

    private getCollection() {
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ["COSTS_CENTRE_GROUPS", "COSTS_CENTRE_TYPES"]).subscribe(rs => {
            let res = rs.json();
            this.costs_centres_groups = res.COSTS_CENTRE_GROUPS;
            this.costs_centres_types = res.COSTS_CENTRE_TYPES;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private getCostCentres() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/costs_centre/operations_costs_centre`).subscribe(rs => {
            let res = rs.json();
            this.operations_costs_centres = res.data;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private save() {
        this.loaderService.display(true);
        switch (this.strAction) {
            case 'Guardar':
                this.helperService.POST(`/api/costscentres`, this.model).subscribe(rs => {
                    let res = rs.json();
                    if (res.store) {
                        this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
                        this.goList();
                    }
                }, err => {
                    this.loaderService.display(false);
                    this.snackBar.open(err.message, 'Guardado', { duration: 4000 });
                });
                break;
            case 'Actualizar':
                this.helperService.PUT(`/api/costscentres/${this.numId}`, this.model).subscribe(rs => {
                    let res = rs.json();
                    if (res.update) {
                        this.snackBar.open(res.message, 'Actualización', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.snackBar.open(err.message, 'Guardado', { duration: 4000 });
                    this.loaderService.display(false);
                });
                break;
            case 'Eliminar':
                this.helperService.DELETE(`/api/costscentres/${this.numId}`).subscribe(rs => {
                    let res = rs.json();
                    if (res.delete) {
                        this.snackBar.open(res.message, 'Eliminación', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.snackBar.open(err.message, 'Eliminación', { duration: 4000 });
                    this.loaderService.display(false);
                });
                break;
        }

    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/costscentres/${this.numId}`).subscribe(rs => {
            let res = rs.json();
            this.model = res.data;
            this.model.operation_cost_centre_id = this.model.root == true ? 'co-' + this.model.operation_cost_centre_id : 'cc-' + this.model.operation_cost_centre_id;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private clean() {
        this.model = {};
        this.model.state = true;
    }

    private goList() {
        this.comp.openList();
    }


}