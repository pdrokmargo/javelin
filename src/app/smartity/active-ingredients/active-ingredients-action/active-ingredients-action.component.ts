import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { AuthenticationService } from "../../../auth/authentication.service";
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel } from '../../bases/base-model';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { ModalWarehouseComponent } from '../../modals/modal-warehouse/modal-warehouse.component';
import { filter } from 'rxjs/operators';
import { ModalUsersComponent } from '../../modals/modal-users/modal-users.component';
import { ActiveIngredientsComponent } from '../active-ingredients.component';

@Component({
    selector: "active-ingredients-action-cmp",
    templateUrl: "active-ingredients-action.component.html",
    styles: []
})

export class ActiveIngredientsActionComponent extends BaseModel implements OnInit {

    private action_active: boolean;
    private str_action: string = 'Guardar';

    constructor(public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: ActiveIngredientsComponent
    ) {
        super();

    }


    ngOnInit() {
        this.clean();
        if (this.comp.id == '' || this.comp.id == undefined) {
            this.str_action = 'Guardar';
            this.model.name = '';
        } else {
            this.str_action = 'Actualizar';
            this.getDataById();
        }
    }

    private save() {
        if (this.comp.id == '' || this.comp.id == undefined) {
            /**Create */
            this.model.delivery_contracts = '';
            this.loaderService.display(true);
            this.helperService.POST(`/api/active-ingredients`, this.model).subscribe(rs => {
                
                let res = rs.json();
                this.loaderService.display(false);
                this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
            }, err => {
                console.log(err);
                this.snackBar.open(err.message, 'Guardado', { duration: 4000, });                
                this.loaderService.display(false);
            });
        } else {
            this.loaderService.display(true);
            this.helperService.PUT(`/api/active-ingredients/${this.numId}`, this.model).subscribe(rs => {
                let res = rs.json();
                if (res.update) {
                    this.snackBar.open(res.message, 'Actualización', {
                        duration: 4000,
                    });
                    this.comp.openList();
                }

            }, err => {
                this.loaderService.display(false);
            });

        }

    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/active-ingredients/${this.numId}`)
            .map((response: Response) => {
                let res = response.json();
                this.model = res.data;
            }).subscribe(
                error => {
                    this.loaderService.display(false);
                }, done => {
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