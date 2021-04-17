import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { MatSnackBar, MatDialogRef, MatDialog, DateAdapter  } from "@angular/material";
import { BaseModel } from '../../bases/base-model';
import { MipresComponent } from '../mipres.component';
import { ModalMipresComponent } from '../../modals';


@Component({
  selector: 'mipres-action-cmp',
  templateUrl: './mipres-action.component.html',
  styleUrls: ['./mipres-action.component.scss']
})
export class MipresActionComponent extends BaseModel  implements OnInit {
  private modalMiPRES: MatDialogRef<ModalMipresComponent>;
  prescriptionHeader: any = {"NoPrescripcion": "", "epsInfo": "", "patientInfo": "", "DirPaciente": "", "CodMunEnt": ""};
  urlApi: String = '/api/mipres';
  sedes: any[] = [
    {"codsede": "PROV004656", "descsede": "MYE BARRANQUILLA"}, 
    {"codsede": "PROV004657", "descsede": "MYE CARTAGENA"}, 
    {"codsede": "PROV004658", "descsede": "MYE SANTA MARTA"}, 
];
  @Input() role: String;
  @Input() addressingList: any[] = [];
  programmingList: any[];
  deliveryList: any[];
  deliveryReportList: any[];
  billingList: any[];
  products: any[];
  
  
  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private comp: MipresComponent,
    private loaderService: LoaderService,
    private helperService: HelperService,
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>
    ) { super(); 
      this.dateAdapter.setLocale('es-CO'); //dd/MM/yyyy
    }

  ngOnInit() {

    this.clean();
        this.getCollection();
        this.products = this.comp.products;
        if (this.numId !== undefined) {
          this.getDataById();
          this.addressingList = this.comp.addressingList;
      }
  }
  private goList() {
    this.comp.openList();
  }
  private clean() {
    
}

private getCollection() {
  // this.loaderService.display(true);
  // this.helperService.POST(`/api/collections`, ['INVENTORY_ENTRY_TYPE']).subscribe(rs => {
  //     const res = rs.json();
  //     this.inventory_movements_type = res.INVENTORY_ENTRY_TYPE;
  //     this.loaderService.display(false);
  // }, err => {
  //     console.log(err);
  //     this.loaderService.display(false);
  // });
}
private getSede(id){
  var descrip_sede = this.sedes.find(x => x.codsede === id);
  if(descrip_sede){
    return descrip_sede.descsede;
  }else{
    return id + "(Sede no activa)";
  }
}
private getCUMSDescription(cums){
  if(this.products != undefined && cums != undefined){
    var out_cums = this.products.find(x => x.cums === cums);
    if(out_cums != undefined){
      return out_cums.description;
    }
  }
  return "";
}
private getDataById(): void {
  this.loaderService.display(true);
  var prescriptionNumber = {"prescriptionNumber": this.numId};
  this.helperService.GET(`${this.urlApi}/getPrescriptionStatus/${this.helperService.secondToken}/${this.numId}/${this.role}`
      ).subscribe(rs => {
        const res = rs.json();
        this.products = this.comp.products;
        // this.addressingList = res.data["addressing"];
        this.programmingList = res.data["programming"];
        this.deliveryList = res.data["delivery"];
        this.deliveryReportList = res.data["delivery-report"];
        this.billingList = res.data["billing"];
        // if(this.role == 'supplier'){
        //   this.prescriptionHeader = this.deliveryList[0];
        // }else{
        //   this.prescriptionHeader = this.addressingList[0];
        // }
        this.prescriptionHeader = this.addressingList[0];
        this.prescriptionHeader["patientInfo"] = this.prescriptionHeader["TipoIDPaciente"] + this.prescriptionHeader["NoIDPaciente"];
        this.prescriptionHeader["epsInfo"] = this.prescriptionHeader["CodEPS"] + ":" + this.comp.epsList.find(element => element["CodEPS"] == this.prescriptionHeader["CodEPS"])["DescEPS"];
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
}
private openModalProgramming(item) {
  console.log(item.FecMaxEnt);
  item.FecMaxEnt = new Date(item.FecMaxEnt+'T00:00:00');
  // item.FecMaxEnt = new Date(item.FecMaxEnt.split('-')[0],item.FecMaxEnt.split('-')[1], item.FecMaxEnt.split('-')[2]);
  console.log(item.FecMaxEnt);
  this.modalMiPRES = this.dialog.open(ModalMipresComponent, {
    data: {
      template: "programming",
      object: item
    },
    height: '300px',
    width: '1000px'

  });
  this.modalMiPRES.afterClosed().subscribe(result => {
    console.log(result);
    if(result != ''){this.getDataById();}
    
  });
}
private openModalCancelProgramming(item) {
  this.modalMiPRES = this.dialog.open(ModalMipresComponent, {
    data: {
      template: "confirmation",
      object: item,
      process: 'programming'
    },
    height: '300px',
    width: '1000px'
  });
  this.modalMiPRES.afterClosed().subscribe(result => {
    this.getDataById();
  });
}
private openModalCancelDelivery(item) {
  this.modalMiPRES = this.dialog.open(ModalMipresComponent, {
    data: {
      template: "confirmation",
      object: item,
      process: 'delivery'
    },
    height: '300px',
    width: '1000px'
  });
  this.modalMiPRES.afterClosed().subscribe(result => {
    this.getDataById();
  });
}

private openModalDelivery(item) {
  this.modalMiPRES = this.dialog.open(ModalMipresComponent, {
    data: {
      template: "delivery",
      object: item
    },
    height: '400px',
    width: '1000px'

  });
  this.modalMiPRES.afterClosed().subscribe(result => {
    this.getDataById();
  });
}
private openModalDeliveryReport(item) {
  this.modalMiPRES = this.dialog.open(ModalMipresComponent, {
    data: {
      template: "delivery-report",
      object: item
    },
    height: '300px',
    width: '700px'
  });
  this.modalMiPRES.afterClosed().subscribe(result => {
    this.getDataById();
  });
}
private openModalCancelDeliveryReport(item) {
  this.modalMiPRES = this.dialog.open(ModalMipresComponent, {
    data: {
      template: "confirmation",
      object: item,
      process: 'delivery-report'
    },
    height: '300px',
    width: '700px'
  });
  this.modalMiPRES.afterClosed().subscribe(result => {
    this.getDataById();
  });
}
private openModalBilling(item) {
  item.NoIDEPS = this.prescriptionHeader["NoIDEPS"];
  item.CodEPS = this.prescriptionHeader["CodEPS"];
  item.CodSerTecAEntregado = item.CodTecEntregado;
  item.CantUnMinDis = item.CantTotEntregada;
  item.ValorUnitFacturado = (item.ValorEntregado / item.CantUnMinDis).toFixed(3);
  item.ValorTotFacturado = item.ValorEntregado.toFixed(3);
  this.modalMiPRES = this.dialog.open(ModalMipresComponent, {
    data: {
      template: "billing",
      object: item
    },
    height: '500px',
    width: '1000px'
  });
  this.modalMiPRES.afterClosed().subscribe(result => {
    this.getDataById();
  });
}
private openModalCancelBilling(item) {
  this.modalMiPRES = this.dialog.open(ModalMipresComponent, {
    data: {
      template: "confirmation",
      object: item,
      process: 'billing'
    },
    height: '300px',
    width: '700px'
  });
  this.modalMiPRES.afterClosed().subscribe(result => {
    this.getDataById();
  });
}
}
