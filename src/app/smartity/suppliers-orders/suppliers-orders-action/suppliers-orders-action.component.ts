import { Component, OnInit } from '@angular/core';
import { ModalStakeholderComponent, ModalPharmaceuticalComponent, ModalDeliveryPointsComponent, ModalIpsNetworkComponent, ModalGeolocationComponent, ModalProductsComponent, ModalWarehouseComponent } from '../../modals';
import { MdDialogRef, MdSnackBar, MdDialog } from '@angular/material';
import "rxjs/add/operator/startWith";
import { BaseModel } from '../../bases/base-model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { SuppliersOrdersComponent } from '../suppliers-orders.component';
import { filter } from 'rxjs/operators';
import { DeliveryContractsComponent } from '../../delivery-contracts/delivery-contracts.component';

@Component({
    selector: 'app-suppliers-orders-action',
    templateUrl: './suppliers-orders-action.component.html',
    styles: []
})
export class SuppliersOrdersActionComponent extends BaseModel implements OnInit {

    private modalCostumer: MdDialogRef<ModalStakeholderComponent>;
    private modalProducts: MdDialogRef<ModalProductsComponent>;
    private modalDeliveryPoints: MdDialogRef<ModalDeliveryPointsComponent>;
    private modalIpsNetwork: MdDialogRef<ModalIpsNetworkComponent>;
    private modalGeolocation: MdDialogRef<ModalGeolocationComponent>;
    private modalStakeHolderDialogRef: MdDialogRef<ModalStakeholderComponent>;
    private modalWarehouse: MdDialogRef<ModalWarehouseComponent>;

    private contract_number: string = '';
    private created_at: string = '';
    private expire_at: string = '';
    private estimate_delivery: string = '';

    private arrPopulation_type: Array<any> = [];
    private arrPerauth_char_type: Array<any> = [];
    private operations_costs_centres: Array<any> = [];
    private arrPayment_condition: Array<any> = [];

    private booEvento: boolean = false;
    private booCapita: boolean = false;
    private booPgp: boolean = false;
    private warehouse: any = {};
    private customers: any = {};
    private _conditional_alerts: any = [];
    private _pharmadrugs: any = [];
    private _ips: any = [];
    private supplier: any = {};
    private employees: any = {};
    private objEvent: any;
    private objCapita: any;
    private objPgp: any;
    private _model: any = {
        delivery_contracts: {
            status: true,
            pharmadrug_monopoly: false,
            pharmadrug_control: false,
            cooled_products: false
        }
    };

    constructor(
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: SuppliersOrdersComponent,
        private dialog: MdDialog,
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
        this.helperService.POST(`/api/collections`, ["POPULATION_TYPE", "PREAUTH_CHAR_TYPE", "PAYMENT_CONDITION"]).subscribe(rs => {
            let res = rs.json();
            this.arrPopulation_type = res.POPULATION_TYPE;
            this.arrPerauth_char_type = res.PREAUTH_CHAR_TYPE;
            this.arrPayment_condition = res.PAYMENT_CONDITION;
        }, err => { });
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
        this.model.products = JSON.stringify(this._pharmadrugs || []);  
        console.log(this.model.products);
        this.loaderService.display(true);
        switch (this.strAction) {
            case 'Guardar':
                this.helperService.POST(`/api/suppliers-orders`, this.model).subscribe(rs => {
                    const res = rs.json();
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
                this.helperService.PUT(`/api/suppliers-orders/${this.numId}`, this.model).subscribe(rs => {
                    const res = rs.json();
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
                this.helperService.DELETE(`/api/suppliers-orders/${this.numId}`).subscribe(rs => {
                    const res = rs.json();
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
        this.helperService.GET(`/api/suppliers-quotes/${this.numId}`).subscribe(rs => {
            const res = rs.json();
            this.model = res.data;
            this.supplier = res['data']['stakeholder_info'] || {};
            this.employees = res['data']['warehouses'] || {};
            this._pharmadrugs = JSON.parse(this.model.products);
            console.log(res);
            if (this.supplier.businessname == '') {
                this.supplier.businessname = this.supplier.fullname;
            }
            if (this.employees.businessname == '') {
                this.employees.businessname = this.employees.fullname;
            }
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private clean() {
        this.model = {};
        this.model.status = true;
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

    openAddSupplier() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent, {
            hasBackdrop: false,
            data: {
                title: 'Proveedores',
                option: '2'
            }
        });

        this.modalStakeHolderDialogRef.afterClosed().pipe(filter((stakeHolder) => stakeHolder)).subscribe((stakeHolder) => {
            if (stakeHolder.businessname == '') { stakeHolder.businessname = stakeHolder.name; }
            this.supplier = stakeHolder;
            this.model.supplier_id = stakeHolder.id;
        });
    }

    openAddEmployees() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent, {
            hasBackdrop: false,
            data: {
                title: 'Compradores',
                option: '3'
            }
        });

        this.modalStakeHolderDialogRef.afterClosed().pipe(filter((stakeHolder) => stakeHolder)).subscribe((stakeHolder) => {
            if (stakeHolder.businessname == '') { stakeHolder.businessname = stakeHolder.name; }
            this.employees = stakeHolder;
            this.model.buyer_employee_id = stakeHolder.id;
        });
    }

    private openModalProducts() {
        this.modalProducts = this.dialog.open(ModalProductsComponent, {
            hasBackdrop: false,
            data: {
                title: 'Productos'
            }
        });
        this.modalProducts.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
            data.pharmadrug_id = data.id;
            if (!this._pharmadrugs) {
                this._pharmadrugs = [];
            }
            if (this._pharmadrugs.length === 0) {
                this._pharmadrugs.push({
                    "sku": data.sku,
                    "name": data.name,
                    "units": data.units,
                    "cost": data.cost
                });
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
        item.status = false;
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
