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
  addressingList: any[] = [];
  programmingList: any[];
  deliveryList: any[];
  deliveryReportList: any[];
  billingList: any[];
  products: any[];
  
  epsList: any[] = [
    {"CodEPS": "CCF007", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR  DE CARTAGENA - COMFAMILIAR CARTAGENA"},
{"CodEPS": "CCF009", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DE BOYACÁ - COMFABOY"},
{"CodEPS": "CCF015", "DescEPS":"CAJA DE COMPENSACION FAMILIAR DE CORDOBA - COMFACOR"},
{"CodEPS": "CCF023", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DE LA GUAJIRA - COMFAGUAJIRA"},
{"CodEPS": "CCF024", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DEL HUILA - COMFAMILIAR HUILA"},
{"CodEPS": "CCF027", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DE NARIÑO - COMFAMILIAR NARIÑO"},
{"CodEPS": "CCF033", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DE SUCRE - COMFASUCRE"},
{"CodEPS": "CCF045", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DEL NORTE DE SANTANDER  - COMFANORTE"},
{"CodEPS": "CCF050", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR C.C.F. DEL ORIENTE COLOMBIANO - COMFAORIENTE"},
{"CodEPS": "CCF053", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DE CUNDINAMARCA - COMFACUNDI"},
{"CodEPS": "CCF055", "DescEPS":"CAJA DE COMPENSACION FAMILIAR  CAJACOPI ATLANTICO"},
{"CodEPS": "CCF102", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DEL CHOCÓ - COMFACHOCO"},
{"CodEPS": "CCFC07", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR  DE CARTAGENA - COMFAMILIAR CARTAGENA -CM"},
{"CodEPS": "CCFC09", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR  DE BOYACÁ - COMFABOY -CM"},
{"CodEPS": "CCFC15", "DescEPS":"CAJA DE COMPENSACION FAMILIAR DE CORDOBA - COMFACOR -CM"},
{"CodEPS": "CCFC20", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DEL CHOCÓ - COMFACHOCO -CM"},
{"CodEPS": "CCFC23", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DE LA GUAJIRA - COMFAGUAJIRA -CM"},
{"CodEPS": "CCFC24", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DEL HUILA - COMFAMILIAR HUILA -CM"},
{"CodEPS": "CCFC27", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DE NARIÑO - COMFAMILIAR NARIÑO -CM"},
{"CodEPS": "CCFC33", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DE SUCRE - COMFASUCRE -CM"},
{"CodEPS": "CCFC50", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR C.C.F. DEL ORIENTE COLOMBIANO - COMFAORIENTE -CM"},
{"CodEPS": "CCFC53", "DescEPS":"CAJA DE COMPENSACIÓN FAMILIAR DE CUNDINAMARCA - COMFACUNDI -CM"},
{"CodEPS": "CCFC55", "DescEPS":"CAJA DE COMPENSACION FAMILIAR  CAJACOPI ATLANTICO -CM"},
{"CodEPS": "EAS016", "DescEPS":"EMPRESAS PUBLICAS DE MEDELLIN - DEPARTAMENTO MEDICO"},
{"CodEPS": "EAS027", "DescEPS":"FONDO PASIVO SOCIAL DE LOS FERROCARRILES NACIONALES"},
{"CodEPS": "EPS001", "DescEPS":"ALIANSALUD E.P.S."},
{"CodEPS": "EPS002", "DescEPS":"SALUD TOTAL S.A. "},
{"CodEPS": "EPS003", "DescEPS":"CAFESALUD E.P.S."},
{"CodEPS": "EPS005", "DescEPS":"E.P.S. SANITAS"},
{"CodEPS": "EPS008", "DescEPS":"COMPENSAR E.P.S."},
{"CodEPS": "EPS010", "DescEPS":"EPS Y MEDICINA PREPAGADA SURAMERICANA S.A"},
{"CodEPS": "EPS012", "DescEPS":"COMFENALCO VALLE "},
{"CodEPS": "EPS016", "DescEPS":"COOMEVA E.P.S. S.A."},
{"CodEPS": "EPS017", "DescEPS":"FAMISANAR E.P.S. LTDA - CAFAM - COLSUBSIDIO"},
{"CodEPS": "EPS018", "DescEPS":"SERVICIO OCCIDENTAL DE SALUD - S.O.S. S.A."},
{"CodEPS": "EPS022", "DescEPS":"A.R.S. CONVIDA"},
{"CodEPS": "EPS023", "DescEPS":"CRUZ BLANCA E.P.S."},
{"CodEPS": "EPS025", "DescEPS":"CAJA DE PREVISION SOCIAL Y SEGURIDAD DEL CASANARE - CAPRESOCA E.P.S."},
{"CodEPS": "EPS033", "DescEPS":"SALUDVIDA S.A. E.P.S."},
{"CodEPS": "EPS037", "DescEPS":"NUEVA EPS S.A"},
{"CodEPS": "EPS040", "DescEPS":"SAVIA SALUD E.P.S. -CM"},
{"CodEPS": "EPS041", "DescEPS":"NUEVA EPS S.A. -CM"},
{"CodEPS": "EPS042", "DescEPS":"COOSALUD ENTIDAD PROMOTORA DE SALUD S.A. "},
{"CodEPS": "EPS044 ", "DescEPS":"MEDIMAS EPS S.A.S. CONTRIBUTIVO"},
{"CodEPS": "EPS045", "DescEPS":"MEDIMAS EPS S.A.S. - CM"},
{"CodEPS": "EPS046", "DescEPS":"FUNDACION SALUD MIA EPS"},
{"CodEPS": "EPS048", "DescEPS":"ASOCIACION MUTUAL SER EMPRESA SOLIDARIA DE SALUD EPS-S -MUTUAL SER EPS-S"},
{"CodEPS": "EPSC03", "DescEPS":"CAFESALUD  E.P.S.  S.A. -CM"},
{"CodEPS": "EPSC22", "DescEPS":"EPS CONVIDA -CM"},
{"CodEPS": "EPSC25", "DescEPS":"CAJA DE PREVISION SOCIAL Y SEGURIDAD DEL CASANARE - CAPRESOCA E.P.S. -CM"},
{"CodEPS": "EPSC33 ", "DescEPS":"SALUDVIDA  S.A.  E.P.S.-CM "},
{"CodEPS": "EPSC34", "DescEPS":"CAPITAL SALUD E.P.S. -CM"},
{"CodEPS": "EPSI01", "DescEPS":"ASOCIACIÓN INDÍGENA DEL CESAR Y LA GUAJIRA - DUSAKAWI"},
{"CodEPS": "EPSI02", "DescEPS":"MANEXKA EPSI"},
{"CodEPS": "EPSI03", "DescEPS":"ASOCIACIÓN INDÍGENA DEL CAUCA - AIC"},
{"CodEPS": "EPSI04", "DescEPS":"ANASWAYUU EPSI"},
{"CodEPS": "EPSI05", "DescEPS":"MALLAMAS EPSI"},
{"CodEPS": "EPSI06", "DescEPS":"PIJAOS SALUD EPSI"},
{"CodEPS": "EPSIC1", "DescEPS":"ASOCIACIÓN INDÍGENA DEL CESAR Y LA GUAJIRA - DUSAKAWI -CM"},
{"CodEPS": "EPSIC2", "DescEPS":"MANEXKA EPSI -CM"},
{"CodEPS": "EPSIC3", "DescEPS":"ASOCIACIÓN INDÍGENA DEL CAUCA - AIC -CM"},
{"CodEPS": "EPSIC4", "DescEPS":"ANASWAYUU EPSI -CM"},
{"CodEPS": "EPSIC5", "DescEPS":"MALLAMAS EPSI -CM"},
{"CodEPS": "EPSIC6", "DescEPS":"PIJAOS SALUD EPSI -CM"},
{"CodEPS": "EPSM03", "DescEPS":"CAFESALUD E.P.S. S.A. -CM"},
{"CodEPS": "EPSM33", "DescEPS":"SALUDVIDA S.A. EPS -CM"},
{"CodEPS": "EPSS01", "DescEPS":"ALIANSALUD E.P.S. -CM"},
{"CodEPS": "EPSS02", "DescEPS":"SALUD TOTAL E.P.S. -CM"},
{"CodEPS": "EPSS03", "DescEPS":"CAFESALUD  E.P.S.  S.A."},
{"CodEPS": "EPSS05", "DescEPS":"EPS SANITAS - CM"},
{"CodEPS": "EPSS08", "DescEPS":"COMPENSAR E.P.S. -CM"},
{"CodEPS": "EPSS10", "DescEPS":"EPS Y MEDICINA PREPAGADA SURAMERICANA S.A -CM"},
{"CodEPS": "EPSS12", "DescEPS":"COMFENALCO VALLE -CM"},
{"CodEPS": "EPSS15", "DescEPS":"Salud  Colpatria  E.P.S.-CM"},
{"CodEPS": "EPSS16", "DescEPS":"COOMEVA E.P.S. S.A. -CM"},
{"CodEPS": "EPSS17", "DescEPS":"FAMISANAR E.P.S. LTDA - CAFAM - COLSUBSIDIO -CM"},
{"CodEPS": "EPSS18", "DescEPS":"SERVICIO OCCIDENTAL DE SALUD - S.O.S. S.A. -CM"},
{"CodEPS": "EPSS23", "DescEPS":"CRUZ BLANCA E.P.S. -CM"},
{"CodEPS": "EPSS33", "DescEPS":"SALUDVIDA S.A .E.P.S"},
{"CodEPS": "EPSS34", "DescEPS":"CAPITAL SALUD E.P.S."},
{"CodEPS": "EPSS37", "DescEPS":"NUEVA EPS S.A. -CM"},
{"CodEPS": "EPSS40", "DescEPS":"SAVIA SALUD E.P.S."},
{"CodEPS": "EPSS41", "DescEPS":"NUEVA EPS S.A."},
{"CodEPS": "EPSS42", "DescEPS":"COOPERATIVA DE SALUD Y DESARROLLO INTEGRAL ZONA SUR ORIENTAL DE CARTAGENA - COOSALUD -CM"},
{"CodEPS": "EPSS44", "DescEPS":"MEDIMAS EPS S.A.S. - CM"},
{"CodEPS": "EPSS45", "DescEPS":"MEDIMAS EPS S.A.S. SUBSIDIADO"},
{"CodEPS": "EPSS46", "DescEPS":"FUNDACION SALUD MIA EPS"},
{"CodEPS": "EPSS48", "DescEPS":"ASOCIACION MUTUAL SER EMPRESA SOLIDARIA DE SALUD EPS-S -MUTUAL SER EPS-S"},
{"CodEPS": "ESS002", "DescEPS":"EMPRESA MUTUAL PARA EL DESARROLLO INTEGRAL DE LA SALUD - EMDISALUD ESS"},
{"CodEPS": "ESS024", "DescEPS":"COOPERATIVA DE SALUD Y DESARROLLO INTEGRAL ZONA SUR ORIENTAL DE CARTAGENA LTDA. - COOSALUD E.S.S."},
{"CodEPS": "ESS062", "DescEPS":"ASMET SALUD EPS SAS"},
{"CodEPS": "ESS062", "DescEPS":"ASOCIACIÓN MUTUAL LA ESPERANZA - ASMET  SALUD"},
{"CodEPS": "ESS076", "DescEPS":"ASOCIACIÓN MUTUAL BARRIOS UNIDOS DE QUIBDÓ E.S.S. - AMBUQ"},
{"CodEPS": "ESS091", "DescEPS":"ENTIDAD COOPERATIVA SOLIDARIA DE SALUD DEL NORTE DE SOACHA - ECOOPSOS "},
{"CodEPS": "ESS091", "DescEPS":"EMPRESA PROMOTORA DE SALUD ECOOPSOS EPS S.A.S."},
{"CodEPS": "ESS118", "DescEPS":"EMSSANAR S.A.S."},
{"CodEPS": "ESS118", "DescEPS":"ASOCIACIÓN MUTUAL EMPRESA SOLIDARIA DE SALUD DE NARIÑO - EMSSANAR E.S.S."},
{"CodEPS": "ESS133", "DescEPS":"COOPERATIVA DE SALUD COMUNITARIA - COMPARTA"},
{"CodEPS": "ESS207", "DescEPS":"ASOCIACIÓN MUTUAL SER EMPRESA SOLIDARIA DE SALUD E.S.S."},
{"CodEPS": "ESSC02", "DescEPS":"EMPRESA MUTUAL PARA EL DESARROLLO INTEGRAL DE LA SALUD - EMDISALUD E.S.S. -CM"},
{"CodEPS": "ESSC07", "DescEPS":"ASOCIACIÓN MUTUAL SER EMPRESA SOLIDARIA DE SALUD E.S.S. -CM"},
{"CodEPS": "ESSC18", "DescEPS":"EMSSANAR S.A.S."},
{"CodEPS": "ESSC18", "DescEPS":"ASOCIACIÓN MUTUAL EMPRESA SOLIDARIA DE SALUD DE NARIÑO - EMSSANAR E.S.S. -CM"},
{"CodEPS": "ESSC24", "DescEPS":"COOPERATIVA DE SALUD Y DESARROLLO INTEGRAL ZONA SUR ORIENTAL DE CARTAGENA - COOSALUD E.S.S. -CM"},
{"CodEPS": "ESSC24", "DescEPS":"COOPERATIVA DE SALUD Y DESARROLLO INTEGRAL ZONA SUR ORIENTAL DE CARTAGENA - COOSALUD E.S.S. -CM"},
{"CodEPS": "ESSC33", "DescEPS":"COOPERATIVA DE SALUD COMUNITARIA - COMPARTA -CM"},
{"CodEPS": "ESSC62", "DescEPS":"ASOCIACIÓN MUTUAL LA ESPERANZA - ASMET  SALUD -CM"},
{"CodEPS": "ESSC62", "DescEPS":"ASMET SALUD EPS SAS -CM"},
{"CodEPS": "ESSC76", "DescEPS":"ASOCIACIÓN MUTUAL BARRIOS UNIDOS DE QUIBDÓ E.S.S. - AMBUQ -CM"},
{"CodEPS": "ESSC91", "DescEPS":"EMPRESA PROMOTORA DE SALUD ECOOPSOS EPS S.A.S."}
  ];
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
        if (this.numId !== undefined) {
          this.getDataById();
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
  var out_cums = this.products.find(x => x.cums === cums);
  if(out_cums != undefined){
    return this.products.find(x => x.cums === cums).description;
  }
  return "";
}
private getDataById(): void {
  this.loaderService.display(true);
  var prescriptionNumber = {"prescriptionNumber": this.numId};
  this.helperService.GET(`${this.urlApi}/getPrescriptionStatus/${this.helperService.secondToken}/${this.numId}/${this.role}`
      ).subscribe(rs => {
        const res = rs.json();
        this.products = res.products;
        this.addressingList = res.data["addressing"];
        this.programmingList = res.data["programming"];
        this.deliveryList = res.data["delivery"];
        this.deliveryReportList = res.data["delivery-report"];
        this.billingList = res.data["billing"];
        this.prescriptionHeader = this.addressingList[0];
        this.prescriptionHeader["patientInfo"] = this.prescriptionHeader["TipoIDPaciente"] + this.prescriptionHeader["NoIDPaciente"];
        this.prescriptionHeader["epsInfo"] = this.prescriptionHeader["CodEPS"] + ":" + this.epsList.find(element => element["CodEPS"] == this.prescriptionHeader["CodEPS"])["DescEPS"];
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
    this.getDataById();
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
