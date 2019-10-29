import { Component, OnInit } from '@angular/core';
import { BaseModel } from '../../bases/base-model';
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { ModalWarehouseComponent } from '../../modals/modal-warehouse/modal-warehouse.component';
import { ModalProductsComponent } from '../../modals/modal-products/modal-products.component';

import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { InventoryMovementsEntryComponent } from '../inventory-movements-entry.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'inventory-movements-entry-action-cmp',
  templateUrl: './inventory-movements-entry-action.component.html'
})
export class InventoryMovementsEntryActionComponent extends BaseModel implements OnInit {

  private modalWarehouse: MatDialogRef<ModalWarehouseComponent>;
  private modalProducts: MatDialogRef<ModalProductsComponent>;
  
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
    private comp: InventoryMovementsEntryComponent,
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
            "product": data,
            "batch": "",
            "fraction": false,
            "location": "",
            "expiration_date": "",
            "units":"",
            "purchase_price":""
        });
         this.model.details.push(movement);
    });
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
        this.model.total = this.model.total + (element.units * element.averageunitcost);
      });
      console.log(this.model.total);
}
  private clean() {
    this.inventory_movements = [];
    this.warehouses = [];
    this.stocks = [];
    this.inventory_movements_type = [];
    this.model = {"warehouse":{"name":""}, "details":[], "warehouse_id":"", "inventory_movement_entry_out_type_id":"", "date":""};
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
    this.helperService.POST(`/api/collections`, ['INVENTORY_ENTRY_TYPE']).subscribe(rs => {
        const res = rs.json();
        this.inventory_movements_type = res.INVENTORY_ENTRY_TYPE;
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
