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
    if (this.__product.length == 0) {
      this.__product.push(product);
    } else {
      if (!this.__product.map(data => data.id === product.id)) {
        this.__product.push(product);
      } else {
        this.snackBar.open('El produccto ya se encuentra seleccionado', 'Productos', { duration: 4000 });
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
        this.movimiento();
      }
      this.loaderService.display(false);

    }, err => {
      this.snackBar.open('Error', err.message, { duration: 4000 });
      console.log(err.message);
      this.loaderService.display(false);
    });
  }

  private movimiento() {
    
    const { warehouse_id, } = this.model;
    const InventoryMovement = {
      'warehouse_id': warehouse_id,
      "date": new Date(),
      "inventory_movement_entry_out_type_id": 175,
      "counterpart_transfer_id": null,
      "details": this.__product.map(a => {
        return {
          product_id: a.id,
          units: a.product.units,
          fraction: true,//a.fraction_cost,
          batch: a.batch,
          location: a.location,
          expiration_date: a.expiration_date,
          purchase_price: 0
        };
      })
    };

    this.loaderService.display(true);
    this.helperService.POST(`/api/inventory-movements`, InventoryMovement).subscribe(rs => {
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
