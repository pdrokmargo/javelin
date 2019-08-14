import { Component, OnInit } from '@angular/core';
import { ModalStakeholderComponent, ModalDeliveryPointsComponent,  ModalWarehouseComponent } from '../../modals';
import { ModalStocksComponent } from '../../modals/modal-stocks/modal-stocks.component';
import { ModalProductsComponent } from '../../modals/modal-products/modal-products.component';
import { ModalCustomersQuotesComponent } from '../../modals/modal-customers-quotes/modal-customers-quotes.component';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import "rxjs/add/operator/startWith";
import { BaseModel } from '../../bases/base-model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { RemissionGoodsComponent } from '../remission-goods.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'remission-goods-action-cmp',
  templateUrl: './remission-goods-action.component.html'
})
export class RemissionGoodsActionComponent  extends BaseModel implements OnInit{

  private modalCostumer: MatDialogRef<ModalStakeholderComponent>;
    private modalProducts: MatDialogRef<ModalProductsComponent>;
    private modalWarehouses: MatDialogRef<ModalWarehouseComponent>;
    private modalDeliveryPoints: MatDialogRef<ModalDeliveryPointsComponent>;
    private modalStakeHolderDialogRef: MatDialogRef<ModalStakeholderComponent>;
    private modalStocks: MatDialogRef<ModalStocksComponent>;
    private modalCustomersQuotes: MatDialogRef<ModalCustomersQuotesComponent>;
  
    private warehouse: any = {};
  private warehouses: any[] = [];
  private stocks: any[] = [];

    private created_at: string = '';
    private expire_at: string = '';
    private estimate_delivery: string = '';
    private contact_name: any = {};

    private arrPopulation_type: Array<any> = [];
    private arrPerauth_char_type: Array<any> = [];
    private operations_costs_centres: Array<any> = [];
    private arrPayment_condition: Array<any> = [];
    private customer: any = {};
    private customers: Array<any> = [];
    private seller: any = {};

    constructor(
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private comp: RemissionGoodsComponent,
        private dialog: MatDialog,
    ) {
        super();
    }

    ngOnInit() {
      this.model.created_at = '';
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

    private openCustomerQuotesLoad(){
        this.modalCustomersQuotes = this.dialog.open(ModalCustomersQuotesComponent, {
            hasBackdrop: false,
            data: {
                title: 'Cotizaciones de clientes',
                customer: this.model.customer,
                option: '2'
            }
        });

        this.modalCustomersQuotes.afterClosed().pipe(filter((customerQuotes) => customerQuotes)).subscribe((customerQuotes) => {
            this.model.details = JSON.parse(customerQuotes.products || []);  
            this.model.customer_id = customerQuotes.customer_id;
            this.customer = customerQuotes.stakeholder_info;
            this.contact_name["name_sales_contact"] = customerQuotes.supplier_info.sales_contact.name;
            this.model.payment_condition_id = customerQuotes.payment_condition_id;
            this.model.notes = 'Remisión realizada a partir de la cotización ' + customerQuotes.document.prefix + '-' + customerQuotes.consecutive;
            this.totalCost();
        });
    }
    private save() {
        this.model.products = JSON.stringify(this.model.details || []);  
        console.log(this.model.products);
        this.loaderService.display(true);
        switch (this.strAction) {
            case 'Guardar':
                var modelInv = {"details": {}};
                modelInv['details'] = this.model.details;
                modelInv['warehouse_id'] = this.model['warehouse_id'];
                modelInv['date'] = this.model['created_at'];
                modelInv['inventory_movement_entry_out_type_id'] = 180;
                modelInv['observations'] = '';
                modelInv['purchase_price'] = 0;
                this.helperService.POST(`/api/inventory-movements`, modelInv).subscribe(rs => {
                    const res = rs.json();
                        if (res.store) {
                            this.model['inventory_movement_out_id'] = res.inventory_movement_id;
                            this.helperService.POST(`/api/remission-goods`, this.model).subscribe(rs1 => {
                                const res1 = rs1.json();
                                if (res1.store) {
                                    this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
                                    this.goList();
                                }
                            }, err => {
                                const err_rs = err.json();
                                this.loaderService.display(false);
                                this.snackBar.open(err_rs.message, 'Error', { duration: 4000 });
                            });        
                        }
                }, err => {
                    const err_rs = err.json();
                    this.loaderService.display(false);
                    this.snackBar.open(err_rs.message, 'Error', { duration: 4000 });
                    
                });
                break;
            case 'Actualizar':
                this.helperService.PUT(`/api/remission-goods/${this.numId}`, this.model).subscribe(rs => {
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
                this.helperService.DELETE(`/api/remission-goods/${this.numId}`).subscribe(rs => {
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
        this.helperService.GET(`/api/remission-goods/${this.numId}`).subscribe(rs => {
            const res = rs.json();
            this.model = res.data;
            this.customer = res['data']['stakeholder_info'] || {};
            this.seller = res['data']['seller'] || {};
            this.contact_name = res['data']['customer_info']['purchases_contact'];
            this.model.details = JSON.parse(this.model.products);
            console.log(res);
            if (this.customer.businessname == '') {
                this.customer.businessname = this.customer.fullname;
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
        this.model = {"warehouse":{"name":""}, "details":[], "customer_id": -1, "warehouse_id":-1, "date":""};
        this.model.status = true;
    }

    private goList() {
        this.comp.openList();
    }

    removeProduct(index){
        this.model.details.splice(index, 1);
        this.totalCost();
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
              "product": {"sku": data.product.sku, "display_name": data.product.display_name, "averageunitcost": data.product.averageunitcost, "units":data.product.units},
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
    private openModalWarehouse() {
      this.modalWarehouses = this.dialog.open(ModalWarehouseComponent, {
          hasBackdrop: false,
          data: {
              title: 'Bodega',
          }
      });
  
      this.modalWarehouses
          .afterClosed()
          .pipe(filter((data) => data))
          .subscribe((data) => {
              this.model.warehouse_id = data.id;
              this.model.warehouse = data;
              console.log(this.model.warehouse_id);
          });
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

    openAddCustomer() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent, {
            hasBackdrop: false,
            data: {
                title: 'Clientes',
                option: '1'
            }
        });

        this.modalStakeHolderDialogRef.afterClosed().pipe(filter((stakeHolder) => stakeHolder)).subscribe((stakeHolder) => {
            if (stakeHolder.businessname == '') { stakeHolder.businessname = stakeHolder.name; }
            this.customer = stakeHolder;
            this.contact_name = JSON.parse(stakeHolder.purchases_contact);
            this.model.payment_condition_id = this.customer.payment_condition_id;
            this.model.customer_id = stakeHolder.id;
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
                title: 'Vendedores',
                option: '3'
            }
        });

        this.modalStakeHolderDialogRef.afterClosed().pipe(filter((stakeHolder) => stakeHolder)).subscribe((stakeHolder) => {
            console.log(stakeHolder);
            if (stakeHolder.businessname == '') { stakeHolder.businessname = stakeHolder.name; }
            this.seller["fullname"] = stakeHolder.name;
            this.model.seller_employee_id = stakeHolder.id;
            console.log(this.seller);
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
                "product": {"sku": data.sku, "display_name": data.display_name, "averageunitcost": data.averageunitcost, "units":data.units},
                "batch": "",
                "fraction": false,
                "location": "",
                "expiration_date": "",
                "units":"",
                "discount": this.customer.global_discount,
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
            this.model.total = this.model.total + (element.units * element.product.averageunitcost);
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

}

