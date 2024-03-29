import { Component, OnInit } from '@angular/core';
import { BaseModel } from '../../bases/base-model';
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { InventoryAuditComponent } from '../inventory-audit.component';
import { ModalWarehouseComponent } from '../../modals/modal-warehouse/modal-warehouse.component';
import { ModalUsersComponent } from '../../modals/modal-users/modal-users.component';
import { filter } from 'rxjs/operators';
import { ModalStocksComponent } from '../../modals/modal-stocks/modal-stocks.component';

@Component({
  selector: 'inventory-audit-action-cmp',
  templateUrl: './inventory-audit-action.component.html'
})
export class InventoryAuditActionComponent extends BaseModel implements OnInit {

  private AUDIT: any = {
    NO_INICIADA: 189,
    EN_CURSO: 190,
    CANCELADA: 191,
    FINALIZADA: 192,
    FINALIZADA_AJUSTE: 193,
    AUDITADA: 194,
  };

  private __product: any = [];
  private __warehouse: any = {};
  private __user: any = {};
  private modalUser: MatDialogRef<ModalUsersComponent>;
  private modalWarehouse: MatDialogRef<ModalWarehouseComponent>;
  private modalStocks: MatDialogRef<ModalStocksComponent>;

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private helperService: HelperService,
    private comp: InventoryAuditComponent,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    if (this.numId != undefined) {
      this.getDataById();
    } else {
      this.model.date = new Date();
      this.model.blinded_qty = false;
      this.model.audit_state_id = this.AUDIT.NO_INICIADA;
    }
  }

  private openModalUser() {
    this.modalUser = this.dialog.open(ModalUsersComponent, {
      hasBackdrop: false,
      data: {
        title: 'Auditor',
        type: 'AUDITOR'
      }
    });

    this.modalUser.afterClosed().subscribe((data) => {
      this.model.user_id = data.id;
      this.__user = data;
      const { firstname, lastname } = this.__user;
      this.__user.fullname = `${firstname} ${lastname}`;
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
        this.__product = [];
        this.model.warehouse_id = data.id;
        this.__warehouse = data;

        this.openModalStocks();
      });
  }

  private openModalStocks() {
    this.modalStocks = this.dialog.open(ModalStocksComponent, {
      hasBackdrop: false,
      data: {
        title: 'Productos',
        warehouse: this.__warehouse.id
      }
    });

    this.modalStocks.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data);

        this.addProduct(data);
      }
    });
  }

  private addProduct(product) {
    console.log(product);
    console.log(this.__product);
    if (this.__product.length == 0) {
      this.__product.push(product);
      console.log('added at first');
    } else {
      if (!this.__product.find(data => data.id == product.id)) {
        this.__product.push(product);
        console.log('added more');
      } else {
        this.snackBar.open('El producto ya se encuentra seleccionado', 'Productos', { duration: 4000 });
        console.log('equal');
      }
    }
  }

  private saveAudit(audit_state_id) {
    if (this.__product.length > 0) {
      this.model.audit_state_id = audit_state_id;
      this.model.details = this.__product;
      this.loaderService.display(true);
      this.helperService.POST(`/api/inventory-audit`, this.model).subscribe(rs => {
        const res = rs.json();
        if (res.store) {
          this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
          if (audit_state_id == this.AUDIT.NO_INICIADA) {
            this.comp.openList();
          } else {
            this.numId = res.id;
          }
        }
        this.loaderService.display(false);
      }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
      });
    } else {
      this.snackBar.open('Seleccione productos', 'Productos', { duration: 4000 });
    }
  }

  private updateAudit(audit_state_id) {
    if (this.__product.length > 0) {
      this.model.audit_state_id = audit_state_id;
      this.model.details = this.__product;
      this.loaderService.display(true);
      this.helperService.PUT(`/api/inventory-audit/${this.numId}`, this.model).subscribe(rs => {
        const res = rs.json();
        if (res.update) {
          this.snackBar.open(res.message, 'Actualizado', { duration: 4000 });
          if (audit_state_id == this.AUDIT.NO_INICIADA) {
            this.comp.openList();
          }
        }
        this.loaderService.display(false);

      }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
      });
    } else {
      this.snackBar.open('Seleccione productos', 'Productos', { duration: 4000 });
    }
  }

  private getDataById(): void {
    this.loaderService.display(true);
    this.helperService.GET(`/api/inventory-audit/${this.numId}`).subscribe(rs => {
      const res = rs.json();
      const { warehouse, user, details, ...data } = res.data;
      this.__product = details.map(a => {
        a.stock.physical_set_stock = a.physical_set_stock;
        a.stock.physical_fraction_stock = a.physical_fraction_stock;
        a.stock.set_stock = a.system_set_stock;
        a.stock.fraction_stock = a.system_fraction_stock;
        return a.stock;
      });
      this.__warehouse = warehouse;
      this.__user = user;
      const { firstname, lastname } = this.__user;
      this.__user.fullname = `${firstname} ${lastname}`;

      this.model = data;

      this.loaderService.display(false);
    }, err => {
      console.log(err);
      this.loaderService.display(false);
    });
  }

  private removeProduct(product) {
    this.__product.splice(this.__product.indexOf(product), 1);
  }

  private cancelAudit() {
    this.helperService.PUT(`/api/inventory-audit/cancel/${this.numId}`, {}).subscribe(rs => {
      const res = rs.json();
      if (res.cancel) {
        this.snackBar.open(res.message, 'Auditoria Cancelada', { duration: 4000 });
        this.comp.openList();
      }
      this.loaderService.display(false);

    }, err => {
      this.snackBar.open('Error', err.message, { duration: 4000 });
      console.log(err.message);
      this.loaderService.display(false);
    });
  }

  private auditar() {
    const product = this.__product.filter(item => item.physical_set_stock === '' || item.physical_fraction_stock === '');
    if (product.length > 0) {
      this.snackBar.open('Es necesario llenar todas las unidades y fracciones', 'Auditar', { duration: 4000 });
    } else {
      this.model.audit_state_id = this.AUDIT.AUDITADA;
      this.model.details = this.__product;

      this.helperService.PUT(`/api/inventory-audit/auditar/${this.numId}`, this.model).subscribe(rs => {
        const res = rs.json();
        if (res.auditada) {
          this.snackBar.open(res.message, 'Auditada', { duration: 4000 });
        }
        this.loaderService.display(false);
      }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
      });
    }
  }

  private finalizar(audit_state_id) {
    this.helperService.PUT(`/api/inventory-audit/finalize/${this.numId}/${audit_state_id}`, this.model).subscribe(rs => {
      const res = rs.json();
      if (res.finalize) {
        this.snackBar.open(res.message, 'Auditoria Finalizada', { duration: 4000 });
        if (audit_state_id == this.AUDIT.FINALIZADA_AJUSTE) {
          this.movimiento();
        }
      }
      this.loaderService.display(false);

    }, err => {
      this.snackBar.open('Error', err.message, { duration: 4000 });
      console.log(err.message);
      this.loaderService.display(false);
    });
  }

  private movimiento() {
    const { warehouse_id } = this.model;
    const date = new Date();

    let details_entrada = [];
    let details_salida = [];

    let cabecera_entrada = {
      warehouse_id,
      date,
      inventory_movement_entry_out_type_id: 175,
      details: details_entrada,
      observations: `Ajuste realizando mediante la auditoría realizada por el auditor: ${this.__user.fullname}`
    }
    let cabecera_salida = {
      warehouse_id,
      date,
      inventory_movement_entry_out_type_id: 181,
      details: details_salida,
      observations: `Ajuste realizando mediante la auditoría realizada por el auditor: ${this.__user.fullname}`
    }

    /*
    
    ((item.physical_set_stock - item.set_stock) * item.product.averageunitcost) + 
    ((item.physical_fraction_stock - item.fraction_stock) * (item.product.averageunitcost/item.product.units)) 
    
    */



    //si es negativo, remove  -> salida   -> 181
    //si es positivo, add     -> entrada  -> 175

    this.__product.forEach(a => {
      const { id, sku, name, averageunitcost, units } = a.product;
      if (a.physical_fraction_stock - a.fraction_stock < 0) {
        details_salida.push({
          units: Math.abs(a.physical_fraction_stock - a.fraction_stock),
          batch: a.batch,
          fraction: true,
          product_id: id,
          product: { sku, averageunitcost, units, display_name: name },
          location: a.location,
          expiration_date: a.expiration_date,
          purchase_price: 0
        });
      } else if (a.physical_fraction_stock - a.fraction_stock > 0) {
        details_entrada.push({
          units: Math.abs(a.physical_fraction_stock - a.fraction_stock),
          batch: a.batch,
          fraction: true,
          product_id: id,
          product: { sku, averageunitcost, units, display_name: name },
          location: a.location,
          expiration_date: a.expiration_date,
          purchase_price: 0
        });
      }


      if (a.physical_set_stock - a.set_stock < 0) {
        details_salida.push({
          units: Math.abs(a.physical_set_stock - a.set_stock),
          batch: a.batch,
          fraction: false,
          product_id: id,
          product: { sku, averageunitcost, units, display_name: name },
          location: a.location,
          expiration_date: a.expiration_date,
          purchase_price: 0
        });
      } else if (a.physical_set_stock - a.set_stock > 0) {
        details_entrada.push({
          units: Math.abs(a.physical_set_stock - a.set_stock),
          batch: a.batch,
          fraction: false,
          product_id: id,
          product: { sku, averageunitcost, units, display_name: name },
          location: a.location,
          expiration_date: a.expiration_date,
          purchase_price: 0
        });
      }
    });

    if (details_entrada.length > 0) {
      this.loaderService.display(true);
      this.helperService.POST(`/api/inventory-movements`, cabecera_entrada).subscribe(rs => {
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

    if (details_salida.length > 0) {
      this.loaderService.display(true);
      this.helperService.POST(`/api/inventory-movements`, cabecera_salida).subscribe(rs => {
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

}
