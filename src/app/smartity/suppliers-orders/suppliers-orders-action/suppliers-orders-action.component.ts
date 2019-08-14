import { Component, OnInit } from '@angular/core';
import { ModalStakeholderComponent, ModalSupplierQuotesComponent, ModalDeliveryPointsComponent, ModalIpsNetworkComponent, ModalGeolocationComponent, ModalWarehouseComponent } from '../../modals';
import { ModalProductsComponent } from '../../modals/modal-products/modal-products.component';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import "rxjs/add/operator/startWith";
import { BaseModel } from '../../bases/base-model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { SuppliersOrdersComponent } from '../suppliers-orders.component';
import { filter } from 'rxjs/operators';
import { DeliveryContractsComponent } from '../../delivery-contracts/delivery-contracts.component';

@Component({
    selector: 'suppliers-orders-action-cmp',
    templateUrl: './suppliers-orders-action.component.html',
    styles: []
})
export class SuppliersOrdersActionComponent extends BaseModel implements OnInit {

    private modalCostumer: MatDialogRef<ModalStakeholderComponent>;
    private modalProducts: MatDialogRef<ModalProductsComponent>;
    private modalDeliveryPoints: MatDialogRef<ModalDeliveryPointsComponent>;
    private modalIpsNetwork: MatDialogRef<ModalIpsNetworkComponent>;
    private modalGeolocation: MatDialogRef<ModalGeolocationComponent>;
    private modalStakeHolderDialogRef: MatDialogRef<ModalStakeholderComponent>;
    private modalWarehouse: MatDialogRef<ModalWarehouseComponent>;
    private modalSupplierQuotes: MatDialogRef<ModalSupplierQuotesComponent>;

    private contract_number: string = '';
    private created_at: string = '';
    private expire_at: string = '';
    private estimate_delivery: string = '';
    private contact_name: any = {};

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
    private buyer: any = {};
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
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: SuppliersOrdersComponent,
        private dialog: MatDialog,
    ) {
        super();
    }

    ngOnInit() {
        this.clean();
        this.getCollection();
        this.getCostCentres();
        if (this.numId !== undefined) {
            this.getDataById();
        }else{
            this.model.created_at = new Date();
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
        this.helperService.GET(`/api/operationscentres`).subscribe(rs => {
            let res = rs.json();
            this.operations_costs_centres = res.data;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private openSupplierQuotesLoad(){
        this.modalSupplierQuotes = this.dialog.open(ModalSupplierQuotesComponent, {
            hasBackdrop: false,
            data: {
                title: 'Cotizaciones de proveedores',
                supplier: this.model.supplier_id,
                option: '2'
            }
        });

        this.modalSupplierQuotes.afterClosed().pipe(filter((supplierQuotes) => supplierQuotes)).subscribe((supplierQuotes) => {
            this.model.details = JSON.parse(supplierQuotes.products || []);  
            this.model.supplier_id = supplierQuotes.supplier_id;
            this.supplier = supplierQuotes.stakeholder_info;
            this.contact_name["name_sales_contact"] = supplierQuotes.supplier_info.sales_contact.name;
            this.model.payment_condition_id = supplierQuotes.payment_condition_id;
            this.model.notes = 'Orden realizada a partir de la cotización ' + supplierQuotes.document.prefix + '-' + supplierQuotes.consecutive;
            this.totalCost();
        });
    }

    private save() {
        this.model.products = JSON.stringify(this.model.details || []);  
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
        this.helperService.GET(`/api/suppliers-orders/${this.numId}`).subscribe(rs => {
            const res = rs.json();
            this.model = res.data;
            this.supplier = res['data']['stakeholder_info'] || {};
            this.warehouse = res['data']['warehouse'] || {};
            this.buyer = res['data']['buyer'] || {};
            this.contact_name = res['data']['supplier_info']['sales_contact'];
            this.model.details = JSON.parse(this.model.products);
            console.log(res);
            if (this.supplier.businessname == '') {
                this.supplier.businessname = this.supplier.fullname;
            }
            // if (this.employee.businessname == '') {
            //     this.employee.businessname = this.employee.fullname;
            // }
            this.totalCost();
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private clean() {
        this.model = {"details":[], "supplier_id": -1};
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

  

    removeProduct(index){
        this.model.details.splice(index, 1);
        this.totalCost();
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
            this.contact_name = JSON.parse(stakeHolder.sales_contact);
            this.model.payment_condition_id = this.supplier.payment_condition_id;
            this.model.supplier_id = stakeHolder.id;
            // this.model.supplier_id = supplierQuotes.supplier_id;
            // this.supplier = supplierQuotes.stakeholder_info;
            // this.contact_name["name_sales_contact"] = supplierQuotes.supplier_info.sales_contact.name;
            // this.model.payment_condition_id = supplierQuotes.payment_condition_id;
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
            console.log(stakeHolder);
            if (stakeHolder.businessname == '') { stakeHolder.businessname = stakeHolder.name; }
            this.buyer["fullname"] = stakeHolder.name;
            this.model.buyer_employee_id = stakeHolder.id;
            console.log(this.buyer);
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
            let movement = new Object( {
                "product_id": data.id,
                "product": {"sku": data.sku, "display_name": data.name, "averageunitcost": data.averageunitcost, "units":data.units},
                "batch": "",
                "fraction": false,
                "location": "",
                "expiration_date": "",
                "units":"",
                "discount": this.supplier.global_discount,
                "unit_cost":"" 
            });
             this.model.details.push(movement);

            // var exist = false;
            // this._pharmadrugs.forEach((element, index) => {
            //     if (element.name == data.name) {
            //         exist = true;
            //     }
            //     if (this._pharmadrugs.length == index + 1) {
            //         if (!exist) {
            //             this._pharmadrugs.push(data);
            //         }
            //     }
            // });
        });
    }

    totalCost(){
        this.model.total = 0;
        this.model.details.forEach(element => {
            this.model.total = this.model.total + (element.units * element.product.averageunitcost * (1-(element.discount/100)));
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

}