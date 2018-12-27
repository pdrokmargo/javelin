import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { AuthenticationService } from "../../../auth/authentication.service";
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel } from '../../bases/base-model';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { DeliveryContractsComponent } from '../delivery-contracts.component';
import { filter } from 'rxjs/operators';
import { ModalPharmaceuticalComponent, ModalStakeholderComponent } from '../../modals';
import { ModalDeliveryPointsComponent } from '../../modals/modal-delivery-points/modal-delivery-points.component';
import { ModalIpsNetworkComponent } from '../../modals/modal-ips-network/modal-ips-network.component';
import { ModalGeolocationComponent } from '../../modals/modal-geolocation/modal-geolocation.component';

@Component({
    selector: "delivery-contracts-action-cmp",
    templateUrl: "delivery-contracts-action.component.html",
    styles: []
})

export class DeliveryContractsActionComponent extends BaseModel implements OnInit {

    private modalCostumer: MatDialogRef<ModalStakeholderComponent>;
    private modalPharmaceutical: MatDialogRef<ModalPharmaceuticalComponent>;
    private modalDeliveryPoints: MatDialogRef<ModalDeliveryPointsComponent>;
    private modalIpsNetwork: MatDialogRef<ModalIpsNetworkComponent>;
    private modalGeolocation: MatDialogRef<ModalGeolocationComponent>

    private contract_number: string = '';
    private contract_start_date: string = '';
    private contract_expiration_date: string = '';

    private arrPopulation_type: Array<any> = [];
    private arrPerauth_char_type: Array<any> = [];

    private booEvento: boolean = false;
    private booCapita: boolean = false;
    private booPgp: boolean = false;

    private customers: any = {};
    private _conditional_alerts: any = [];
    private _pharmadrugs: any = [];
    private _ips: any = [];
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

    constructor(public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: DeliveryContractsComponent,
        private dialog: MatDialog) {
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
        this.helperService.POST(`/api/collections`, ["POPULATION_TYPE", "PREAUTH_CHAR_TYPE"]).subscribe(rs => {
            let res = rs.json();
            this.arrPopulation_type = res.POPULATION_TYPE;
            this.arrPerauth_char_type = res.PREAUTH_CHAR_TYPE;
        }, err => { });
    }

    private save() {
        if (this.model.delivery_points && this.model.delivery_points.length > 0) {

            if (this.booEvento) {
                this.objEvent.contract_number = this.contract_number;
                this.objEvent.contract_expiration_date = this.contract_expiration_date;
                this.objEvent.contract_start_date = this.contract_start_date;
            }

            if (!this.booCapita) {
                this.objCapita.contract_number = this.contract_number;
                this.objCapita.contract_expiration_date = this.contract_expiration_date;
                this.objCapita.contract_start_date = this.contract_start_date;
            }

            if (!this.booPgp) {
                this.objPgp.contract_number = this.contract_number;
                this.objPgp.contract_expiration_date = this.contract_expiration_date;
                this.objPgp.contract_start_date = this.contract_start_date;
            }
            this.model.pharmadrugs = JSON.stringify(this._pharmadrugs || []);
            this.model.ips = this._ips || [];
            this.model.conditional_alerts = JSON.stringify(this._conditional_alerts || []);
            console.log(this.objEvent);

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

            this.loaderService.display(true);
            switch (this.strAction) {
                case 'Guardar':
                    this.helperService.POST(`/api/delivery-contracts`, this.model).subscribe(rs => {
                        let res = rs.json();
                        if (res.store) {
                            this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
                            this.goList();
                        }
                    }, err => {
                        this.snackBar.open(err.message, 'Guardado', { duration: 4000 });
                        this.loaderService.display(false);
                    });
                    break;
                case 'Actualizar':
                    this.helperService.PUT(`/api/delivery-contracts/${this.numId}`, this.model).subscribe(rs => {
                        let res = rs.json();
                        if (res.update) {
                            this.snackBar.open(res.message, 'Actualización', { duration: 4000 });
                            this.goList();
                        }
                    }, err => {
                        this.snackBar.open(err.message, 'Actualización', { duration: 4000 });
                        this.loaderService.display(false);
                    });
                    this.loaderService.display(false);
                    break;
                case 'Eliminar':
                    this.helperService.DELETE(`/api/delivery-contracts/${this.numId}`).subscribe(rs => {
                        let res = rs.json();
                        if (res.delete) {
                            this.snackBar.open(res.message, 'Eliminación', { duration: 4000 });
                            this.goList();
                        }
                    }, err => {
                        this.snackBar.open(err.message, 'Eliminación', { duration: 4000 });
                        this.loaderService.display(false);
                    });
                    break;
            }
        } else {
            this.snackBar.open('No ha seleccionado ningún punto de dispensación', 'Error', { duration: 4000 });
            return null;
        }


    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/delivery-contracts/${this.numId}`).subscribe(rs => {
            let res = rs.json();
            this.model = res.data;
            var delivery_points = [];
            this.model.contract_point.forEach((element, index) => {
                element.config = JSON.parse(element.config);
                delivery_points.push({
                    id: element.delivery_points.id,
                    name: element.delivery_points.name,
                    event: element.config.event || false,
                    capita: element.config.capita || false,
                    pgp: element.config.pgp || false,
                });

                if (this.model.contract_point.length - 1 == index) {
                    this.model.delivery_points = delivery_points;
                }
            });

            this.customers = this.model.customers;
            this._pharmadrugs = JSON.parse(this.model.pharmadrugs);
            this._conditional_alerts = JSON.parse(this.model.conditional_alerts);
            this._ips = this.model.ips;

            this.objEvent = JSON.parse(this.model.event);
            this.booEvento = !(Object.keys(this.objEvent).length === 0);
            if (this.booEvento) {
                this.contract_number = this.objEvent.contract_number;
                this.contract_expiration_date = this.objEvent.contract_expiration_date;
                this.contract_start_date = this.objEvent.contract_start_date;
            }

            this.objPgp = JSON.parse(this.model.pgp);
            this.booPgp = !(Object.keys(this.objPgp).length === 0);
            if (this.booPgp) {
                this.contract_number = this.objPgp.contract_number;
                this.contract_expiration_date = this.objPgp.contract_expiration_date;
                this.contract_start_date = this.objPgp.contract_start_date;
            }

            this.objCapita = JSON.parse(this.model.capita);
            this.booCapita = !(Object.keys(this.objCapita).length === 0);
            if (this.booCapita) {
                this.contract_number = this.objCapita.contract_number;
                this.contract_expiration_date = this.objCapita.contract_expiration_date;
                this.contract_start_date = this.objCapita.contract_start_date;
            }

            this.loaderService.display(false);
        }, err => {
            console.log(err);
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

    private openModalCostumers() {
        this.modalCostumer = this.dialog.open(ModalStakeholderComponent, {
            hasBackdrop: false,
            data: {
                title: 'Clientes',
                option: '1'
            }
        });

        this.modalCostumer.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
            this.model.customer_id = data.id;
            this.customers = data;
        });
    }

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
                data.event = false;
                data.capita = false;
                data.pgp = false;
                data.fare = '';
                this._pharmadrugs.push(data);
            }
            var exist = false;
            this._pharmadrugs.forEach((element, index) => {
                if (element.name == data.name) {
                    exist = true;
                }
                if (this._pharmadrugs.length == index + 1) {
                    if (!exist) {
                        data.event = false;
                        data.capita = false;
                        data.pgp = false;
                        data.fare = '0';
                        this._pharmadrugs.push(data);
                    }
                }
            });
        });
    }

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
                data.event = false;
                data.capita = false;
                data.pgp = false;
                this.model.delivery_points.push(data);
            }
            var exist = false;
            this.model.delivery_points.forEach((element, index) => {
                if (element.name == data.name) {
                    exist = true;
                }
                if (this.model.delivery_points.length == index + 1) {
                    if (!exist) {
                        data.event = false;
                        data.capita = false;
                        data.pgp = false;
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

    private openModalGeolocation() {
        this.modalGeolocation = this.dialog.open(ModalGeolocationComponent, {
            hasBackdrop: false,
            width: '400px',
            data: { title: 'Ubicación', }
        });

        this.modalGeolocation.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
            if (data) {
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
            }
        });


    }

    private deleteDetailedCapita(item) {
        item.state = false;
    }

    private activeperauth_length() {
        if (!this.objEvent.perauth) {
            this.objEvent.perauth_length = '';
            this.objEvent.perauth_char_type = '';
        }
    }

    private clearEvent() {
        if (this.booEvento) {
            this.objEvent = {};
            this._pharmadrugs.forEach(element => {
                element.fare = '';
                element.event = false;
            });
        }
    }

    private clearCapita() {
        if (this.booCapita) {
            this.objCapita = {};
            this._pharmadrugs.forEach(element => {
                element.capita = false;
            });
        }
    }

    private clearPgp() {
        if (this.booPgp) {
            this.objPgp = {};
            this._pharmadrugs.forEach(element => {
                element.pgp = false;
            });
        }
    }
}