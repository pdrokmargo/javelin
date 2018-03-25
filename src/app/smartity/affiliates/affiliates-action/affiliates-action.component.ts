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
import { AffiliatesComponent } from '../affiliates.component';

@Component({
    selector: "affiliates-action-cmp",
    templateUrl: "affiliates-action.component.html"
})

export class AffiliatesActionComponent extends BaseModel implements OnInit {

    private arrDocument_type: any = [];
    private arrGender: any = [];
    private arrDelivery_contract: any = [];
    private arrContracts_payment_method: any = [];
    private arrAffiliate_condition: any = [];
    private arrIps_network: any = [];
    private arrAffiliate_type: any = [];
    private arrPublic_health_condition: any = [];
    private arrDepartment: any = [];
    private arrCity: any = [];
    private booGeolocation: boolean = false;



    private arrDelivery_point_group: Array<any> = [];
    private action_active: boolean;
    private str_action: string = 'Guardar';


    constructor(public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: AffiliatesComponent,
        private dialog: MdDialog
    ) {
        super();

    }


    ngOnInit() {

        this.clean();
        this.getCollection();
        this.loadDepartment();
        this.loadDeliveryContract();
        if (this.numId == undefined || this.numId == null || this.numId == '') {
            this.str_action = 'Guardar';
        } else {
            this.str_action = 'Actualizar';
            this.getDataById();
        }
    }

    private getCollection() {
        this.helperService.POST(`/api/collections`, [
            "TYPES_OF_DOCUMENTS",
            "CONTRACTS_PAYMENT_METHOD",
            "AFFILIATE_TYPE",
            "AFFILIATE_CONDITION",
            "PUBLIC_HEALTH_CONDITION",
            "GENDER"
        ]).subscribe(rs => {
            let res = rs.json();
            this.arrDocument_type = res.TYPES_OF_DOCUMENTS;
            this.arrGender = res.GENDER;
            this.arrContracts_payment_method = res.CONTRACTS_PAYMENT_METHOD;
            this.arrAffiliate_type = res.AFFILIATE_TYPE;
            this.arrAffiliate_condition = res.AFFILIATE_CONDITION;
            this.arrPublic_health_condition = res.PUBLIC_HEALTH_CONDITION;

        }, err => { console.log(err); });
    }

    private loadDepartment() {
        this.arrCity = [];
        this.booGeolocation = false;
        this.helperService.GET(`/api/departamentos?pais_id=7`).subscribe(rs => {
            let res = rs.json();
            this.arrDepartment = res.departamentos;
        }, err => {
            console.log(err);
        });
    }

    private loadCity() {
        this.helperService.GET(`/api/ciudades?departamento_id=${this.model.department}`).subscribe(rs => {
            let res = rs.json();
            this.arrCity = res.ciudades;
            this.model.city = this.model.geolocation.city;
        }, err => {
            console.log(err);
        });
    }

    private loadDeliveryContract() {
        this.helperService.GET(`/api/delivery-contracts`).subscribe(rs => {
            let res = rs.json();
            this.arrDelivery_contract = res.data;
        }, err => {
            console.log(err);
        });
    }

    private save() {
        this.model.geolocation = JSON.stringify({
            "department": this.model.department,
            "city": this.model.city
        });
        if (this.numId == '') {
            /**Create */
            this.model.delivery_contracts = '';
            this.loaderService.display(true);
            this.helperService.POST(`/api/affiliates`, this.model).subscribe(rs => {

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
            this.helperService.PUT(`/api/affiliates/${this.numId}`, this.model).subscribe(rs => {
                let res = rs.json();
                if (res.update) {
                    this.snackBar.open(res.message, 'Actualización', {
                        duration: 3500,
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
        this.helperService.GET(`/api/affiliates/${this.numId}`)
            .map((response: Response) => {
                let res = response.json();
                this.model = res.data;
                this.model.geolocation = JSON.parse(this.model.geolocation);
                this.model.department = this.model.geolocation.department;
                this.loadCity();

            }).subscribe(
                error => {
                    this.loaderService.display(false);
                }, done => {
                    this.loaderService.display(false);
                });
    }

    private clean() {
        this.model = {};
        this.model.geolocation = {};
        this.model.state = true;
    }

    private goList() {
        this.comp.openList();
    }

    private loadIpsNetword(item){
        this.arrIps_network = item.ips;        
    }
}