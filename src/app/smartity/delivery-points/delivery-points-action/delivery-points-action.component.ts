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
import { DeliveryPointsComponent } from '../delivery-points.component';
import { ModalWarehouseComponent } from '../../modals/modal-warehouse/modal-warehouse.component';
import { filter } from 'rxjs/operators';
import { ModalUsersComponent } from '../../modals/modal-users/modal-users.component';

@Component({
    selector: "delivery-points-action-cmp",
    templateUrl: "delivery-points-action.component.html"
})

export class DeliveryPointsActionComponent extends BaseModel implements OnInit {

    private arrDelivery_point_group: Array<any> = [];
    private modalWarehouse: MdDialogRef<ModalWarehouseComponent>;
    private modalUsers: MdDialogRef<ModalUsersComponent>;
    private warehouse: any = {};
    private arrDelivery_contracts = [];    

    @Output() select = new EventEmitter();   

    constructor(
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: DeliveryPointsComponent,
        private dialog: MdDialog
    ) {
        super();

    }

    ngOnInit() {
        this.clean();
        this.getCollection();
        if (this.numId !== undefined) {
            this.getDataById();
        }
    }

    private getCollection() {
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ["DELIVERY_POINTS_GROUPS"]).subscribe(rs => {
            let res = rs.json();
            this.arrDelivery_point_group = res.DELIVERY_POINTS_GROUPS;
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
                this.model.delivery_contracts = '[]';
                this.helperService.POST(`/api/delivery-points`, this.model).subscribe(rs => {
                    let res = rs.json();
                    if (res.store) {
                        this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
                        this.comp.openList();
                        this.loaderService.display(false);
                    }
                }, err => {
                    this.snackBar.open(err.message, 'Guardado', { duration: 4000 });
                    this.loaderService.display(false);
                });
                break;
            case 'Actualizar':
                this.helperService.PUT(`/api/delivery-points/${this.numId}`, this.model).subscribe(rs => {
                    let res = rs.json();
                    if (res.update) {
                        this.snackBar.open(res.message, 'Actualización', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.snackBar.open(err.message, 'Actualización', { duration: 4000 });
                    this.loaderService.display(false);
                });
                break;
            case 'Eliminar':
                this.helperService.DELETE(`/api/delivery-points/${this.numId}`).subscribe(rs => {
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
        this.helperService.GET(`/api/delivery-points/${this.numId}`).map((response: Response) => {
            let res = response.json();
            this.model = res.data;
            this.arrDelivery_contracts = [];
            this.model.contract_point.forEach(element => {
                element.config = JSON.parse(element.config);
                this.arrDelivery_contracts.push({
                    id: element.delivery_contracts.id,
                    name: element.delivery_contracts.name,
                    event: element.config.event || false,
                    capita: element.config.capita || false,
                    pgp: element.config.pgp || false,
                });
            });
            this.warehouse = this.model.warehouses;
            this.model.operation_cost_centre_id = this.model.root == true ? 'co-' + this.model.operation_cost_centre_id : 'cc-' + this.model.operation_cost_centre_id;
        }).subscribe(error => {
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

    private openModalWarehouse() {
        this.modalWarehouse = this.dialog.open(ModalWarehouseComponent, {
            hasBackdrop: false,
            data: {
                title: 'Bodega',
            }
        });

        this.modalWarehouse
            .afterClosed()
            .pipe(filter((data) => data))
            .subscribe((data) => {
                this.model.warehouse_id = data.id;
                this.warehouse = data;
            });
    }

    private openModalUsers() {
        this.modalUsers = this.dialog.open(ModalUsersComponent, {
            hasBackdrop: false,
            data: {
                title: 'Usuarios',
                type: 'regente'
            }
        });

        this.modalUsers.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
            if (!this.model.assigned_users) {
                this.model.assigned_users = [];
            }
            this.model.assigned_users.push(data);
            if (!this.model.users) {
                this.model.users = [];
            }
            this.model.users.push({ "user_id": data.id });
        });
    }


}