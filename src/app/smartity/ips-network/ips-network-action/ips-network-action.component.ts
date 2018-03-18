import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { AuthenticationService } from "../../../auth/authentication.service";
import { MdSnackBar, MdDialogRef, MdDialog } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel } from '../../bases/base-model';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { ModalWarehouseComponent } from '../../modals/modal-warehouse/modal-warehouse.component';
import { filter } from 'rxjs/operators';
import { ModalUsersComponent } from '../../modals/modal-users/modal-users.component';
import { IpsNetworkComponent } from '../ips-network.component';

@Component({
    selector: "ips-network-action-cmp",
    templateUrl: "ips-network-action.component.html",
    styles: []
})

export class IpsNetworkActionComponent extends BaseModel implements OnInit {

    @Output() select = new EventEmitter();
    @Input() noaction: boolean;

    private action_active: boolean;
    private str_action: string = 'Guardar';

    constructor(public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: IpsNetworkComponent,
        private dialog: MdDialog
    ) {
        super();
    }


    ngOnInit() {
        this.clean();
        if (this.numId == undefined || this.numId == null || this.numId == '') {
            this.str_action = 'Guardar';
        } else {
            this.str_action = 'Actualizar';
            this.getDataById();
        }
    }





    private save() {

        if (this.numId == '') {


            /**Create */
            this.model.delivery_contracts = '';
            this.loaderService.display(true);
            this.helperService.POST(`/api/ips-network`, this.model)
                .subscribe(rs => {

                    let res = rs.json();
                    if (res.store) {
                        this.snackBar.open(res.message, 'Guardado', {
                            duration: 3500,
                        });
                        this.clean();
                        this.loaderService.display(false);
                    }

                }, err => {
                    this.loaderService.display(false);
                });

        } else {
            this.loaderService.display(true);
            this.helperService.PUT(`/api/ips-network/${this.numId}`, this.model).subscribe(rs => {
                let res = rs.json();
                if (res.update) {
                    this.snackBar.open(res.message, 'Actualización', {
                        duration: 3500,
                    });
                    this.comp.openList();
                }
                if (this.noaction) {
                    this.select.emit(res.data);
                }

            }, err => {
                this.loaderService.display(false);
            });

        }

    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/ips-network/${this.numId}`)
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