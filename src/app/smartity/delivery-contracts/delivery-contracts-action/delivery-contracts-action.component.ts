import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { AuthenticationService } from "../../../auth/authentication.service";
import { MdSnackBar, MdDialogRef, MdDialog } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel } from '../../bases/base-model';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { DeliveryContractsComponent } from '../delivery-contracts.component';
import { ModalCustumersComponent } from '../../modals/modal-custumers/modal-custumers.component';
import { filter } from 'rxjs/operators';
import { ModalPharmaceuticalComponent } from '../../modals';
import { ModalDeliveryPointsComponent } from '../../modals/modal-delivery-points/modal-delivery-points.component';
import { ModalIpsNetworkComponent } from '../../modals/modal-ips-network/modal-ips-network.component';
import { ModalGeolocationComponent } from '../../modals/modal-geolocation/modal-geolocation.component';

@Component({
    selector: "delivery-contracts-action-cmp",
    templateUrl: "delivery-contracts-action.component.html",
    styles: []
})

export class DeliveryContractsActionComponent extends BaseModel implements OnInit {


    private arrPopulation_type: Array<any> = [];
    private arrPerauth_char_type: Array<any> = [];

    private _pharmadrugs: any = [];
    private _conditional_alerts: any = [];
    private _ips: any = [];

    private action_active: boolean;
    private str_action: string = 'Guardar';

    private booEvento: boolean = false;
    private booCapita: boolean = false;
    private booPgp: boolean = false;

    private objEvent: any;
    private objCapita: any;
    private objPgp: any;

    private _model: any = {
        delivery_contracts: {
            state: true,
            pharmadrug_monopoly: false,
            pharmadrug_control: false,
            cooled_products: false
        }
    };

    constructor(public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: DeliveryContractsComponent,
        private dialog: MdDialog) {
        super();

    }


    ngOnInit() {

        this.clean();
        this.getCollection();

        if (this.numId != '') {
            this.str_action = 'Actualizar';
            this.getDataById();
        } else {
            this.str_action = 'Guardar';
        }
    }

    /**
     * get the country and the tax regime with the collection of names
     */
    private getCollection() {
        this.helperService.POST(`/api/collections`, ["POPULATION_TYPE", "PREAUTH_CHAR_TYPE"]).subscribe(rs => {
            let res = rs.json();
            this.arrPopulation_type = res.POPULATION_TYPE;
            this.arrPerauth_char_type = res.PREAUTH_CHAR_TYPE;
        }, err => { });
    }



    private save() {
        this.model.pharmadrugs = JSON.stringify(this._pharmadrugs || []);
        this.model.ips = this._ips || [];
        this.model.conditional_alerts = JSON.stringify(this._conditional_alerts || []);
        this.model.event = JSON.stringify(this.objEvent || {});
        this.model.pgp = JSON.stringify(this.objPgp || {});
        this.model.capita = JSON.stringify(this.objCapita || {});

        if (!this.booEvento) {
            this.model.event = null;
        }
        if (!this.booCapita) {
            this.model.capita = null;
        }
        if (!this.booPgp) {
            this.model.pgp = null;
        }


        /** Update */
        if (this.numId != '') {
            this.loaderService.display(true);
            this.helperService.PUT(`/api/delivery-contracts/${this.numId}`, this.model)
                .map((response: Response) => {

                    let res = response.json();
                    if (res.status == 'success') {
                        this.snackBar.open(res.message, 'Actualización', {
                            duration: 3500,
                        });
                        this.goList();
                    }

                }).subscribe(
                    error => {
                        this.loaderService.display(false);
                    }, done => {
                        this.loaderService.display(false);
                    });

        } else {
            /**Create */
            this.loaderService.display(true);
            this.helperService.POST(`/api/delivery-contracts`, this.model)
                .map((response: Response) => {

                    let res = response.json();
                    if (res.store) {
                        this.snackBar.open(res.message, 'Guardado', {
                            duration: 3500,
                        });
                        this.goList();
                        this.clean();

                    }

                }).subscribe(
                    error => {
                        this.loaderService.display(false);
                    }, done => {
                        this.loaderService.display(false);
                    });

        }

    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/delivery-contracts/${this.numId}`)
            .map((response: Response) => {

                let res = response.json();
                this.model = res.data;
                this.customers = this.model.customers;
                this._pharmadrugs = JSON.parse(this.model.pharmadrugs);
                this._conditional_alerts = JSON.parse(this.model.conditional_alerts);
                this._ips = this.model.ips;

                this.objEvent = JSON.parse(this.model.event);
                this.objPgp = JSON.parse(this.model.pgp);
                this.objCapita = JSON.parse(this.model.capita);

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
        this._pharmadrugs = [];
        this._conditional_alerts = [];
        this.objEvent = {};
        this.objPgp = {};
        this.objCapita = {};
    }

    private goList() {
        this.comp.openList();
    }

    private modalCostumer: MdDialogRef<ModalCustumersComponent>;
    private customers: any = {};
    private openModalCostumers() {
        this.modalCostumer = this.dialog.open(ModalCustumersComponent, {
            hasBackdrop: false,
            data: {
                title: 'Clientes',
            }
        });

        this.modalCostumer.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
            this.model.customer_id = data.id;
            this.customers = data;
        });
    }

    private modalPharmaceutical: MdDialogRef<ModalPharmaceuticalComponent>;

    private openModalPharmaceutical() {
        this.modalPharmaceutical = this.dialog.open(ModalPharmaceuticalComponent, {
            hasBackdrop: false,
            data: {
                title: 'Medicamentos'
            }
        });

        this.modalPharmaceutical.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
            data.pharmadrug_id = data.id;
            if (!this._pharmadrugs) {
                this._pharmadrugs = [];
            }
            if (this._pharmadrugs.length == 0) {
                this._pharmadrugs.push(data);
            }
            var exist = false;
            this._pharmadrugs.forEach((element, index) => {
                if (element.name == data.name) {
                    exist = true;
                }
                if (this._pharmadrugs.length == index + 1) {
                    if (!exist) {
                        this._pharmadrugs.push(data);
                    }
                }
            });
        });
    }

    private modalDeliveryPoints: MdDialogRef<ModalDeliveryPointsComponent>;
    private openModalDeliveryPoints() {
        this.modalDeliveryPoints = this.dialog.open(ModalDeliveryPointsComponent, {
            hasBackdrop: false,
            data: {
                title: 'Puntos de dispensación'
            }
        });

        this.modalDeliveryPoints.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
            data.delivery_point_id = data.id;
            if (!this.model.delivery_points) {
                this.model.delivery_points = [];
            }
            if (this.model.delivery_points.length == 0) {
                this.model.delivery_points.push(data);
            }
            var exist = false;
            this.model.delivery_points.forEach((element, index) => {
                if (element.name == data.name) {
                    exist = true;
                }
                if (this.model.delivery_points.length == index + 1) {
                    if (!exist) {
                        this.model.delivery_points.push(data);
                    }
                }
            });
        });
    }
    private deleteDeliveryPoints(item) {
        this.model.delivery_points.splice(this._ips.indexOf(item), 1);
    }

    private deletePharmadrug(item) {
        this._pharmadrugs.splice(this._pharmadrugs.indexOf(item), 1);
    }

    private modalIpsNetwork: MdDialogRef<ModalIpsNetworkComponent>;
    private openModalIpsNetwork() {
        this.modalIpsNetwork = this.dialog.open(ModalIpsNetworkComponent, {
            hasBackdrop: false,
            data: {
                title: 'Red adscrita'
            }
        });

        this.modalIpsNetwork.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
            console.log(data);
            if (this._ips.length == 0) {
                this._ips.push(data);
            } else {
                var exist = false;
                this._ips.forEach((element, index) => {
                    if (element.value == data.value) {
                        exist = true;
                    }
                    if (this._ips.length - 1 == index) {
                        if (!exist) {
                            this._ips.push(data);
                        }
                    }
                });
            }

        });
    }
    private deleteIps(item) {
        this._ips.splice(this._ips.indexOf(item), 1);
    }

    private modalGeolocation: MdDialogRef<ModalGeolocationComponent>
    private openModalGeolocation() {
        this.modalGeolocation = this.dialog.open(ModalGeolocationComponent, {
            hasBackdrop: false,
            width: '400px',
            data: { title: 'Geolocalisación', }
        });

        this.modalGeolocation.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
            if (this.objCapita.detailed_capita == undefined || this.objCapita.detailed_capita == null) {
                this.objCapita.detailed_capita = [];
                this.objCapita.detailed_capita.push(data);
            }
            var exist = false;
            var isDelete = false;
            var _data;

            this.objCapita.detailed_capita.forEach((element, index) => {
                if (element.city.id == data.city.id) {
                    exist = true;
                    if (!element.state) {
                        isDelete = true;
                        _data = element;
                    }
                }
                if (this.objCapita.detailed_capita.length - 1 == index) {
                    if (!exist) {
                        this.objCapita.detailed_capita.push(data);
                    }
                    if (isDelete) {
                        _data.state = true;
                    }
                }
            });
        });


    }
    private deleteDetailedCapita(item) {
        item.state = false;
    }
}