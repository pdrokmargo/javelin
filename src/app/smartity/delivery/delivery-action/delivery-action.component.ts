import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel } from '../../bases/base-model';
import { LoaderService, HelperService } from '../../../shared';
import { DeliveryComponent } from '../delivery.component';
import { filter } from 'rxjs/operators';
import { ModalAffiliatesComponent, ModalConfirmationComponent, ModalProductsComponent } from '../../modals';

@Component({
  selector: 'delivery-action-cmp',
  templateUrl: './delivery-action.component.html'
})
export class DeliveryActionComponent extends BaseModel implements OnInit {

  private modalAffiliates: MatDialogRef<ModalAffiliatesComponent>;
  private modalProducts: MatDialogRef<ModalProductsComponent>;
  private modalConfirmYesNo: MatDialogRef<ModalConfirmationComponent>;
  private affiliate: any = {};
  private pharmadrugs: any = {};
  private arrModality: any = [];
  private arrMedicalDiagnostics: any = [];
  private arrIPS: any = [];
  private arrAffiliateDeliveries: any = [];
  private arrScheduledDeliveries: any = [];
  private arrStock: any = [];


  constructor(public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private helperService: HelperService,
    private comp: DeliveryComponent,
    private dialog: MatDialog) {
    super();
  }


  ngOnInit() {
    this.clean();
    this.getCollection();
    this.getMedicalDiagnostics();
    if (this.numId !== undefined) {
      this.getDataById();
    } else {
      this.model.date = new Date();
    }
  }

  private print(){
    window.onafterprint = (event) => {
      this.goList();
    };
    window.print();
  }

//   var beforePrint = function() {
//     console.log('Functionality to run before printing.');
// };

  private getCollection() {
    this.helperService.POST(`/api/collections`, ["DELIVERY_CONTRACT_MODALITY"]).subscribe(rs => {
      let res = rs.json();
      this.arrModality = res.DELIVERY_CONTRACT_MODALITY;
    }, err => { });
  }

  private getMedicalDiagnostics() {
    this.helperService.GET(`/api/medical-diagnostics`).subscribe(rs => {
      let res = rs.json();
      this.arrMedicalDiagnostics = res.medical_diagnostics;
    }, err => { });
  }
  private getScheduledDeliveries() {
    this.helperService.GET(`/api/scheduled-deliveries/${this.affiliate.id}`).subscribe(rs => {
      let res = rs.json();
      this.arrScheduledDeliveries = res.scheduled_deliveries.data;
      
    }, err => { });
  }
  private getAffiliateDeliveries() {
    this.helperService.GET(`/api/affiliate-deliveries/${this.affiliate.id}`).subscribe(rs => {
      let res = rs.json();
      this.arrAffiliateDeliveries = res.affiliate_deliveries.data;
      this.groupAffiliateDeliveriesDetails();
    }, err => { });
  }
  private clean() {
    this.model = { "details": [], "delivery_date": new Date() };
    this.model.state = true;
  }
  private goList() {
    this.comp.openList();
  }

  private updateRowStock(index, detail) {

    // detail.stockSelected = detail.stocks[index].fraction_stock;

  }
  private groupAffiliateDeliveriesDetails(): void {
    let details = [];
    let i = 0;
    do {
      let detail = {};
      detail = this.arrAffiliateDeliveries[i];
      let passed = false;
      details.forEach(d => {
        if (d.delivery_id == detail['delivery_id']) {
          passed = true;
        }
      });
      if(!passed){
        details.push(detail);
      }
      i++;
    } while (this.arrAffiliateDeliveries.length > i);
    this.arrAffiliateDeliveries = details;
    console.log(this.arrAffiliateDeliveries);
    console.log(details);
  }
  private groupBatchs(): void {
    let details = [];
    let i = 0;
    let empty = false;
    let toRemove = [];
    do {
      let detail = {};
      if (!empty && this.model.details.length > 0) {
        detail = this.model.details[i];
      }
      let passed = false;
      details.forEach(d => {
        if (d.product_id == detail['product_id']) {
          passed = true;
        }
      });
      if (!passed) {
        detail['stocks'] = [];
        this.model.details.forEach(d => {
          if (!empty && d.product_id == detail['product_id'] && !passed) {
            let _stockSelected = {};
            _stockSelected['batch'] = d.batch;
            _stockSelected['expiration_date'] = d.expiration_date;
            detail['stocks'].push(_stockSelected);
          }
        });
        details.push(detail);
        passed = false;
      }
      i++;
    } while (this.model.details.length > i);
    this.model.details = details;
    console.log(this.model.details);
    console.log(details);
  }
  private getDataById(): void {
    this.loaderService.display(true);
    this.helperService.GET(`/api/deliveries/${this.numId}`).subscribe(rs => {
      let res = rs.json();
      this.model = res.data;
      this.groupBatchs();
      this.affiliate = this.model.affiliate;
      this.arrIPS = this.affiliate.delivery_contract.ips;
      this.pharmadrugs = JSON.parse(this.affiliate.delivery_contract.pharmadrugs);
      this.getScheduledDeliveries();
      this.getAffiliateDeliveries();
      this.loaderService.display(false);
    }, err => {
      console.log(err);
      this.loaderService.display(false);
    });

  }


  private openModalAffiliates() {
    this.modalAffiliates = this.dialog.open(ModalAffiliatesComponent, {
      hasBackdrop: false,
      data: {
        title: 'Afiliados',
        option: '1'
      }
    });

    this.modalAffiliates.afterClosed().pipe(filter((data) => data)).subscribe((data) => {
      this.model.affiliate_id = data.id;
      this.affiliate = data;
      this.arrIPS = this.affiliate.delivery_contract.ips;
      this.pharmadrugs = JSON.parse(this.affiliate.delivery_contract.pharmadrugs);
      this.getScheduledDeliveries();
      this.getAffiliateDeliveries();
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
      this.loaderService.display(true);
      this.helperService.GET(`/api/product/${data.id}`).subscribe(rs => {
        let res = rs.json();
        let canBeDelivered = false;
        this.pharmadrugs.forEach(element => {
          if (res.data.product_detail.pharmaceutical_drug_id == element.pharmaceutical_drug_id) {
            canBeDelivered = true;
          }
        });
        if (canBeDelivered) {
          this.helperService.GET(`/api/stocks-products/${data.id}`).subscribe(rs => {
            let res = rs.json();
            let movement = new Object({
              "product_id": data.id,
              "product": data,
              "batch": "",
              "requested_units": 0,
              "delivered_units": 0,
              "delivery_number": 1,
              "total_deliveries": 1,
              "stocks": [res.data],
              "location": "",
              "expiration_date": "",
              "stockSelected": [res.data[0]],
              "deliveryCovered": false,
              "scheduleddelivery_id": '',
            });
            console.log(res.data[0]);
            let productIsLoaded = false;
            this.model.details.forEach(element => {
              if (element.product.sku == data.sku) {
                productIsLoaded = true;
              }
            });
            if (!productIsLoaded) {
              this.model.details.push(movement);
              if (movement["stockSelected"] == undefined) {
                this.snackBar.open('El producto no tiene existencias. Se creará un pendiente al guardar la dispensación.', 'Dispensación', { duration: 10000 });
              }
            } else {
              this.snackBar.open('El producto ya se encuentra en la lista', 'Dispensación', { duration: 7000 });
            }

            this.loaderService.display(false);
          }, err => {
            console.log(err);
            this.loaderService.display(false);
          });
        } else {
          this.snackBar.open('El producto no está habilitado para el contrato del afiliado', 'Contratos', { duration: 7000 });
        }
        this.loaderService.display(false);
      }, err => {
        console.log(err);
        this.loaderService.display(false);
      });
    });
  }
  private removeProduct(index) {
    this.model.details.splice(index, 1);
  }
  private validateDelivered(unitsR, unitsD, index) {
    let sumStocks = 0;
    this.model.details[index]["stockSelected"].forEach(element => {
      sumStocks += element["fraction_stock"];
    });
    if (unitsD > unitsR) {
      this.snackBar.open('Se han modificado automáticamente las unidades de entrega debido a que se ingresaron cantidades superiores a las unidades solicitadas (' + unitsR + '). ', 'Producto a dispensar', { duration: 7000 });
      this.model.details[index]["delivered_units"] = unitsR;
    } else if (unitsD > sumStocks) {
      this.snackBar.open('Se han modificado automáticamente las unidades de entrega debido a que se ingresaron cantidades superiores a las unidades existentes (' + sumStocks + '). ', 'Producto a dispensar', { duration: 7000 });
      this.model.details[index]["delivered_units"] = sumStocks;
    }
  }
  private validateRequested(units, index, i) {
    this.model.details[index]["delivered_units"] = units;
    this.model.details[index]["deliveryCovered"] = true;
    let sumStocks = 0;
    let ic = 0;
    this.model.details[index]["stockSelected"].forEach(element => {
      sumStocks += element["fraction_stock"];

      if (units > sumStocks) {
        ic += 1;
      }
    });
    if (i > -1) {
      this.model.details[index]["stocks"].splice(i + 1, this.model.details[index]["stocks"].length - i - 1);
      this.model.details[index]["stockSelected"].splice(i + 1, this.model.details[index]["stockSelected"].length - i - 1);
    }
    if (units > sumStocks) {
      if (this.model.details[index]["stocks"][this.model.details[index]["stocks"].length - 1].length > 1) {
        let newStocks = this.model.details[index]["stocks"][this.model.details[index]["stocks"].length - 1].filter(e => e.id != this.model.details[index]["stockSelected"][this.model.details[index]["stocks"].length - 1]["id"])
        this.model.details[index]["stocks"].push(newStocks);
        this.model.details[index]["stockSelected"].push(this.model.details[index]["stocks"][this.model.details[index]["stocks"].length - 1][0]);
        // sumStocks += this.model.details[index]["stocks"][this.model.details[index]["stocks"].length-1][0]["fraction_stock"];
        if (this.model.details[index]["stocks"][this.model.details[index]["stocks"].length - 1][0]["fraction_stock"] + sumStocks < units) {
          this.validateRequested(units, index, i);
        }
      } else {
        this.snackBar.open('No hay unidades suficientes para cubrir las unidades solicitadas', 'Existencias Dispensación', { duration: 4000 });
        this.model.details[index]["delivered_units"] = sumStocks;
        this.model.details[index]["deliveryCovered"] = false;
      }

    } else {
      this.model.details[index]["stocks"].splice(ic + 1, this.model.details[index]["stocks"].length - ic - 1);
      this.model.details[index]["stockSelected"].splice(ic + 1, this.model.details[index]["stockSelected"].length - ic - 1);
    }
  }
  private openModalConfirmYesNo() {
    this.modalConfirmYesNo = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Desea crear el registro?',
        title: 'Confirmar',
        button_confirm: 'Sí',
        button_close: 'No'
      }

    });

    this.modalConfirmYesNo.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        console.log('SI');//save() or update()
        this.save();
      } else {
        console.log('NO');
      }
    });
  }

  private save() {
    this.loaderService.display(true);
    switch (this.strAction) {
      case 'Guardar':
        this.helperService.POST(`/api/deliveries`, this.model).subscribe(rs => {
          let res = rs.json();
          if (res.store) {
            this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
            this.goList();
          }
        }, err => {
          this.snackBar.open(err.message, 'Guardado', { duration: 4000 });
          this.loaderService.display(false);
        });
        break;
      case 'Actualizar':
        this.helperService.PUT(`/api/deliveries/${this.numId}`, this.model).subscribe(rs => {
          let res = rs.json();
          if (res.update) {
            this.snackBar.open(res.message, 'Actualización', { duration: 4000 });
            this.goList();
          }
        }, err => {
          this.snackBar.open(err.message, 'Actualización', { duration: 4000 });
          this.loaderService.display(false);
        });
        this.loaderService.display(false);
        break;
    }
  }
}
