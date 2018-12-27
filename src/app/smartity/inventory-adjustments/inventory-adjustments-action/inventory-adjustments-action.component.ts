import { Component, OnInit } from '@angular/core';
import { BaseModel } from '../../bases/base-model';
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { ModalStocksComponent } from '../../modals/modal-stocks/modal-stocks.component';
import { ModalWarehouseComponent } from '../../modals/modal-warehouse/modal-warehouse.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { InventoryAdjustmentsComponent } from '../inventory-adjustments.component';
import { filter } from 'rxjs/operators';


@Component({
    selector: 'inventory-adjustments-action-cmp',
    templateUrl: './inventory-adjustments-action.component.html'
})
export class InventoryAdjustmentsActionComponent extends BaseModel implements OnInit {

    private modalStocks: MatDialogRef<ModalStocksComponent>;
    private modalWarehouse: MatDialogRef<ModalWarehouseComponent>;
    private inventory_adjustments: any[] = [];
    private inventory_adjustments_type: any[] = [];

    constructor(public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: InventoryAdjustmentsComponent,
        private dialog: MatDialog) { super(); }

    ngOnInit() {
        this.clean();
        this.getCollection();
        if (this.numId != undefined) {
            this.getDataById();
        } else {
            this.model.adjustment_date = new Date();
        }

    }
    private getCollection() {
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ['INVENTORY_ADJUSTMENT_TYPE']).subscribe(rs => {
            const res = rs.json();
            this.inventory_adjustments_type = res.INVENTORY_ADJUSTMENT_TYPE;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }
    private clean() {
        this.inventory_adjustments = [];
        this.inventory_adjustments_type = [];
        this.model = { "warehouse_id": -1, "stock": {"product": { "sku": "", "display_name": "", "averageunitcost": ""}, "warehouse":{} } };
    }
    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/inventory-adjustments/${this.numId}`).subscribe(rs => {
            const res = rs.json();
            this.model = res.data;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }
    private goList() {
        this.comp.openList();
    }

    private openModalStocks() {
        this.modalStocks = this.dialog.open(ModalStocksComponent, {
            hasBackdrop: false,
            data: {
                title: 'Existencias',
                warehouse: this.model.warehouse_id
            }
        });
        this.modalStocks.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
            this.model.stock_product_id = data.id;
            this.model.new_adjustment_value = "";
            this.model.product.sku = data.product.sku;
            this.model.product.averageunitcost = data.product.averageunitcost;
            this.model.product.display_name = data.product.display_name;
            this.model.set_stock = data.set_stock;
            this.model.fraction_stock = data.fraction_stock;
            this.model.batch = data.batch;
            this.model.location = data.location;
            if (this.model.inventory_adjustment_type_id == 187) {
                this.model.current_adjustment_value = data.batch;
            } else if (this.model.inventory_adjustment_type_id == 188) {
                this.model.current_adjustment_value = data.location;
            }
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
                this.model.warehouse = data;

                this.model.new_adjustment_value = "";
                this.model.current_adjustment_value = "";
                this.model.product.sku = "";
                this.model.product.averageunitcost = "";
                this.model.product.display_name = "";
                this.model.set_stock = "";
                this.model.fraction_stock = "";
                this.model.batch = "";
                this.model.location = "";

            });
    }

    setCurrentValue(){
        if (this.model.inventory_adjustment_type_id == 187) {
            this.model.current_adjustment_value = this.model.batch;
        } else if (this.model.inventory_adjustment_type_id == 188) {
            this.model.current_adjustment_value = this.model.location;
        }
    }

    guardar(){
        this.loaderService.display(true);
        this.helperService.POST(`/api/inventory-adjustments`, this.model).subscribe(rs => {
            const res = rs.json();
            if (res.store) {
                this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
                this.comp.openList();
            }
            this.loaderService.display(false);
        }, err => {
            this.snackBar.open('Error', err.message, { duration: 4000 });
            console.log(err.message);
            this.loaderService.display(false);
        });
    
    }

}
