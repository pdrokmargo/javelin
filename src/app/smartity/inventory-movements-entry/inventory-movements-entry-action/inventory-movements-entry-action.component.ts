import { Component, OnInit } from '@angular/core';
import { BaseModel } from '../../bases/base-model';
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { ModalWarehouseComponent } from '../../modals/modal-warehouse/modal-warehouse.component';
import { ModalProductsComponent } from '../../modals/modal-products/modal-products.component';
import { ModalInventoryMovementTransfersComponent } from '../../modals/modal-inventory-movement-transfers/modal-inventory-movement-transfers.component';
import { ModalPurchaseOrdersComponent } from '../../modals/modal-purchase-orders/modal-purchase-orders.component';

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
  private modalPurchaseOrders: MatDialogRef<ModalPurchaseOrdersComponent>;
  private modalInventoryMovementTransfer: MatDialogRef<ModalInventoryMovementTransfersComponent>;
  
  private inventory_movements: any[] = [];
  private inventory_movements_type: any[] = [];
  private warehouse: any = {};
  private warehouses: any[] = [];
  private stocks: any[] = [];
  private remaining: any[] = [];
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
  private openInventoryMovementTransfer() {
    this.modalInventoryMovementTransfer = this.dialog.open(ModalInventoryMovementTransfersComponent, {
        hasBackdrop: false,
        data: {
            title: 'Transferencias',
            document_fullfilled: this.model.document_fullfilled_id
        }
    });
    this.modalInventoryMovementTransfer.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
        this.model.document_fullfilled_id = data.id; 
        this.model.details = data.remaining;
         this.remaining = JSON.parse(JSON.stringify(data.remaining));
         if(this.remaining.length == 0){
            this.snackBar.open('Todos los items de la transferencia ' + data.document.prefix + '-' + data.consecutive + ' han sido ingresados.', 'Salida por transferencia cumplida', { duration: 7000 });
         }
    });
}
  private openSupplierOrderLoad() {
    this.modalPurchaseOrders = this.dialog.open(ModalPurchaseOrdersComponent, {
        hasBackdrop: false,
        data: {
            title: 'Órdenes de compra'
        }
    });
    this.modalPurchaseOrders.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
        this.model.document_fullfilled_id = data.id; 
        this.model.details = data.remaining;
        console.log(data.remaining);
         this.remaining = JSON.parse(JSON.stringify(data.remaining));
         if(this.remaining.length == 0){
            this.snackBar.open('Todos los items de la orden de compra ' + data.document.prefix + '-' + data.consecutive + ' han sido ingresados.', 'Orden de compra cumplida', { duration: 7000 });
         }
         
    });
}
private checkUnits(units, index){
    this.remaining.forEach(element => {
        if(element.product_id == this.model.details[index]['product_id'] && (this.model.details[index]['units'] > element.units || units <= 0)){
            let uni = element.units;
            this.snackBar.open('No es posible ingresar más unidades que las registradas en la orden de compra, inferiores ó iguales a 0 (cero).', 'Ingreso erróneo', { duration: 7000 });
            units = uni+1;
            units = units-1;
            this.model.details[index]['units'] = units;
            this.model.details = JSON.parse(JSON.stringify(this.model.details));
        }
        if(this.model.details[index]['fraction'] == true){
            this.model.details[index]['fraction'] = false;
            this.snackBar.open('No es posible realizar ingresos fraccionados de órdenes de compra', 'Ingreso erróneo', { duration: 7000 });

        }
        console.log(this.model.details[index]['units']);
        console.log(element.units);
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
            "product": data,
            "batch": "",
            "fraction": false,
            "location": "",
            "expiration_date": "",
            "units":"",
            "purchase_price":0
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
totalCost(units, index){
    this.model.total = 0;
    this.model.details.forEach(element => {
        this.model.total = this.model.total + (element.units * element.product.averageunitcost);
      });
      this.checkUnits(units, index);
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
    this.totalCost(this.model.details[index]['units'], index);
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
