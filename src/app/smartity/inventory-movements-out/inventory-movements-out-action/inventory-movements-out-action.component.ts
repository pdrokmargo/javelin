import { Component, OnInit } from '@angular/core';
import { BaseModel } from '../../bases/base-model';
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { ModalWarehouseComponent } from '../../modals/modal-warehouse/modal-warehouse.component';
import { ModalProductsComponent } from '../../modals/modal-products/modal-products.component';
import { ModalStocksComponent } from '../../modals/modal-stocks/modal-stocks.component';

import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { InventoryMovementsOutComponent } from '../inventory-movements-out.component';
import { filter } from 'rxjs/operators';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'inventory-movements-out-action-cmp',
  templateUrl: './inventory-movements-out-action.component.html'
})
export class InventoryMovementsOutActionComponent extends BaseModel implements OnInit {

  private modalWarehouse: MatDialogRef<ModalWarehouseComponent>;
  private modalProducts: MatDialogRef<ModalProductsComponent>;
  private modalStocks: MatDialogRef<ModalStocksComponent>;
  
  private swFraction = false;
  private inventory_movements: any[] = [];
  private inventory_movements_type: any[] = [];
  private warehouse: any = {};
  private warehouses: any[] = [];
  private stocks: any[] = [];
  private _pharmadrugs: any = [];
  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private helperService: HelperService,
    private comp: InventoryMovementsOutComponent,
    private dialog: MatDialog
) {
    super();
}
 
  ngOnInit() {
    this.clean();
        this.getCollection();
        if (this.numId != undefined) {
            this.getDataById();
        }else{
            this.model.date = new Date();
        }
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
            "units":""
        });
         this.model.details.push(movement);
    });
}

private openModalStocks() {
    let swExpired = false;
    if(this.model.inventory_movement_entry_out_type_id == 183){
        swExpired = true;
    }
    this.modalStocks = this.dialog.open(ModalStocksComponent, {
        hasBackdrop: false,
        data: {
            title: 'Existencias',
            warehouse: this.model.warehouse_id,
            expired: swExpired
        }
    });
    this.modalStocks.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
        let movement = new Object( {
            "product_id": data.product.id,
            "product": data.product,
            "batch": data.batch,
            "fraction": false,
            "location": data.location,
            "expiration_date": data.expiration_date,
            "set_stock":  data.set_stock,
            "fraction_stock":  data.fraction_stock,
            "units":""
        });
        console.log(data.fraction);
         this.model.details.push(movement);
    });
}
fractionChange(){
    this.swFraction = !this.swFraction;
}
guardar(){
    this.loaderService.display(true);
    this.helperService.POST(`/api/inventory-movements`, this.model).subscribe(rs => {
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
  private getDataById(): void {
    this.loaderService.display(true);
    this.helperService.GET(`/api/inventory-movements/${this.numId}`).subscribe(rs => {
        const res = rs.json();
        this.model = res.data;
        this.loaderService.display(false);
    }, err => {
        console.log(err);
        this.loaderService.display(false);
    });
}
totalCost(){
    this.model.total = 0;
    this.model.details.forEach(element => {
        this.model.total = this.model.total + (element.units * element.product.averageunitcost);
      });
      console.log(this.model.total);
}
  private clean() {
    this.inventory_movements = [];
    this.warehouses = [];
    this.stocks = [];
    this.inventory_movements_type = [];
    this.model = {"warehouse":{"name":""}, "details":[], "warehouse_id":-1, "inventory_movement_entry_out_type_id":-1, "date":""};
}
private goList() {
  this.comp.openList();
}
removeProduct(index){
    this.model.details.splice(index, 1);
    this.totalCost();
}
  private getCollection() {
    this.loaderService.display(true);
    this.helperService.POST(`/api/collections`, ['INVENTORY_OUT_TYPE']).subscribe(rs => {
        const res = rs.json();
        this.inventory_movements_type = res.INVENTORY_OUT_TYPE;
        this.loaderService.display(false);
    }, err => {
        console.log(err);
        this.loaderService.display(false);
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
        });
}

}
