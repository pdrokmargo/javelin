import { Component, OnInit } from '@angular/core';
import { BaseModel } from '../../bases/base-model';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { ModalStakeholderComponent } from '../../modals';
import { ModalProductsComponent } from '../../modals/modal-products/modal-products.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import "rxjs/add/operator/startWith";
import { filter } from 'rxjs/operators';
import { SuppliersQuotesComponent } from '../suppliers-quotes.component';

@Component({
    selector: 'suppliers-quotes-action-cmp',
    templateUrl: './suppliers-quotes-action.component.html',
    styles: []
})
export class SuppliersQuotesActionComponent extends BaseModel implements OnInit {

    private modalProducts: MatDialogRef<ModalProductsComponent>;
    private modalStakeHolderDialogRef: MatDialogRef<ModalStakeholderComponent>;

    private contact_name: string = '';

    private arrPopulation_type: Array<any> = [];
    private arrPerauth_char_type: Array<any> = [];
    private arrPayment_condition: Array<any> = [];

    private customers: any = {};
    private _conditional_alerts: any = [];
    private pharmadrugs: any = [];
    private _pharmadrugs: any = [];
    private products: any = [];
    private supplier: any = {};
    private _model: any = {
        delivery_contracts: {
            state: true,
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
        private comp: SuppliersQuotesComponent,
        private dialog: MatDialog,
    ) {
        super();
    }

    ngOnInit() {
        this.clean();
        this.getCollection();
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

    totalCost(){
        this.model.total = 0;
        this.model.details.forEach(element => {
            this.model.total = this.model.total + (element.units * element.product.averageunitcost * (1-(element.discount/100)));
          });
    }

    removeProduct(index){
        this.model.details.splice(index, 1);
        this.totalCost();
    }

    private save() {
        this.model.products = JSON.stringify(this.model.details || []);
        console.log(this.model.products);
        this.loaderService.display(true);
        switch (this.strAction) {
            case 'Guardar':
                this.helperService.POST(`/api/suppliers-quotes`, this.model).subscribe(rs => {
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
                this.helperService.PUT(`/api/suppliers-quotes/${this.numId}`, this.model).subscribe(rs => {
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
                this.helperService.DELETE(`/api/suppliers-quotes/${this.numId}`).subscribe(rs => {
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
            this.contact_name = res['data']['supplier_info']['sales_contact'];
            this.model.details = JSON.parse(this.model.products);
            console.log(res);
            if (this.supplier.businessname == '') {
                this.supplier.businessname = this.supplier.fullname;
            }
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
    }

    private goList() {
        this.comp.openList();
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
            console.log(movement);
            // var exist = false;
            // this.model.details.forEach((element, index) => {
            //     if (element.product_id == data.id) {
            //         exist = true;
            //     }
            //     if (!exist) {
            //             this.model.details.push(movement);
            //     }
            // });
        });
    }


    private openAddSupplier() {
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
        });
    }
}