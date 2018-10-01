import { Component, OnInit } from '@angular/core';
import { BaseModel } from '../../bases/base-model';
import { MdDialogRef, MdSnackBar, MdDialog } from '@angular/material';
import { ModalStakeholderComponent, ModalProductsComponent } from '../../modals';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import "rxjs/add/operator/startWith";
import { filter } from 'rxjs/operators';
import { SuppliersQuotesComponent } from '../suppliers-quotes.component';

@Component({
    selector: 'app-suppliers-quotes-action',
    templateUrl: './suppliers-quotes-action.component.html',
    styles: []
})
export class SuppliersQuotesActionComponent extends BaseModel implements OnInit {

    private modalProducts: MdDialogRef<ModalProductsComponent>;
    private modalStakeHolderDialogRef: MdDialogRef<ModalStakeholderComponent>;

    private contact_number: string = '';

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
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: SuppliersQuotesComponent,
        private dialog: MdDialog,
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
        this.helperService.POST(`/api/collections`, ["POPULATION_TYPE", "PREAUTH_CHAR_TYPE", "PAYMENT_CONDITION"]).subscribe(rs => {
            let res = rs.json();
            this.arrPopulation_type = res.POPULATION_TYPE;
            this.arrPerauth_char_type = res.PREAUTH_CHAR_TYPE;
            this.arrPayment_condition = res.PAYMENT_CONDITION;
        }, err => { });
    }

    private save() {
        this.model.products = JSON.stringify(this._pharmadrugs || []);
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
            this._pharmadrugs = JSON.parse(this.model.products);
            console.log(res);
            if (this.supplier.businessname == '') {
                this.supplier.businessname = this.supplier.fullname;
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

    private deletePharmadrug(item) {
        this._pharmadrugs.splice(this._pharmadrugs.indexOf(item), 1);
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
            this.model.supplier_id = stakeHolder.id;
        });
    }
}
