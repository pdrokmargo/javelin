import { Component, OnInit, Inject } from '@angular/core';
import { LoaderService, HelperService } from '../../../shared';
import { MatDialogRef, MAT_DIALOG_DATA , MatSnackBar} from '@angular/material';
import { FormControl } from "@angular/forms";
@Component({
  selector: 'app-modal-mipres',
  templateUrl: './modal-mipres.component.html',
  styleUrls: ['./modal-mipres.component.scss']
})
export class ModalMipresComponent implements OnInit {
  sedes: any[] = [
    {"codsede": "PROV004656", "descsede": "MYE BARRANQUILLA"}, 
    {"codsede": "PROV004657", "descsede": "MYE CARTAGENA"}, 
    {"codsede": "PROV004658", "descsede": "MYE SANTA MARTA"}, 
];
entregaTotal: any[] = [
  {"codEntTotal": "0", "descEntTotal": "NO"}, 
  {"codEntTotal": "1", "descEntTotal": "SI"}
];
tipoTecnologias: any[] = [
  {"codTipoTec": "M", "descTipoTec": "Medicamento"}, 
  {"codTipoTec": "P", "descTipoTec": "Procedimiento"},
  {"codTipoTec": "D", "descTipoTec": "Dispositivo Médico"},
  {"codTipoTec": "N", "descTipoTec": "Producto Nutricional"},
  {"codTipoTec": "S", "descTipoTec": "Servicio Complementario"}
];
causasNoEntrega: any[] = [
  {"codCausaNoEntrega": "0", "descCausaNoEntrega": "Ninguna"},
  {"codCausaNoEntrega": "7", "descCausaNoEntrega": "No fue posible contactar al paciente"},
  {"codCausaNoEntrega": "8", "descCausaNoEntrega": "Paciente fallecido"},
  {"codCausaNoEntrega": "9", "descCausaNoEntrega": "Paciente se niega a recibir el suministro"}
];
tipoIDs: any[] = [
  {"codTipoID": "CC", "descTipoID": "CC: Cédula de Ciudadanía"},
  {"codTipoID": "CE", "descTipoID": "CE: Cédula de Extranjería"},
  {"codTipoID": "PA", "descTipoID": "PA: Pasaporte"},
  {"codTipoID": "CD", "descTipoID": "CD: Carné Diplomático"},
  {"codTipoID": "SC", "descTipoID": "SC: Salvoconducto de Permanencia"},
  {"codTipoID": "PR", "descTipoID": "PR: Pasaporte de la ONU"},
  {"codTipoID": "PE", "descTipoID": "PE: Permiso Especial de Permanencia"},
  {"codTipoID": "AS", "descTipoID": "AS: Adulto Mayor Sin Identificar"}
];
urlApi: String;
patientInfo: String;
  constructor(public loaderService: LoaderService,
    public helperService: HelperService,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModalMipresComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      this.urlApi = '/api/mipres';
     }

  ngOnInit() {
    if(this.data.template == 'delivery'){
      this.data.object.FecEntrega = new Date();
       var cod_tipo_id = this.tipoIDs.find(x => x.codTipoID === this.data.object.TipoIDPaciente);
       if(cod_tipo_id){
        this.data.object.TipoIDRecibe = cod_tipo_id.codTipoID;
        this.data.object.NoIDRecibe = this.data.object.NoIDPaciente;
       }else{
        this.data.object.TipoIDRecibe = "CC";
        this.data.object.NoIDRecibe = "";
       }
      
      
    }

    if(this.data.template == 'billing'){
      this.data.object.CuotaModer = '0';
      this.data.object.Copago = '0';
    }
    
    
  }
  

  cancelState(process) {      
    if(process == 'programming'){
      this.cancelProgramming(); 
    }else if(process == 'delivery'){
      this.cancelDelivery(); 
    }else if(process == 'delivery-report'){
      this.cancelDeliveryReport(); 
    }else if(process == 'billing'){
      this.cancelBilling(); 
    }
  }
  cancelProgramming(){
    this.loaderService.display(true);
    console.log("CancelProgramming" + JSON.stringify(this.data) );
    var programming = {
      "IdProgramacion": this.data.object.IDProgramacion
    };
    
    this.helperService.POST(`${this.urlApi}/cancelPrescriptionState/${this.helperService.secondToken}/programming`, programming
      ).subscribe(rs => {
        const res = rs.json();
        this.snackBar.open('Anulación Exitosa', 'Programación anulada.', { duration: 4000 });
        this.dialogRef.close(true);
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
  }
  performProgramming(){
    this.loaderService.display(true);
    var programming = {
      "ID": this.data.object.ID,
      "FecMaxEnt": this.data.object.FecMaxEnt,
      "TipoIDSedeProv": this.data.object.TipoIDProv,
      "NoIDSedeProv": this.data.object.NoIDProv,
      "CodSedeProv": this.data.object.CodSedeProv,
      "CodSerTecAEntregar": this.data.object.CodSerTecAEntregar,
      "CantTotAEntregar": this.data.object.CantTotAEntregar,
    };
    this.helperService.POST(`${this.urlApi}/changePrescriptionState/${this.helperService.secondToken}/programming`, programming
      ).subscribe(rs => {
        const res = rs.json();
        this.snackBar.open('Programación Exitosa', 'El registro de programación ha sido creado.', { duration: 4000 });
        this.dialogRef.close(true);
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
  }
  cancelDelivery(){
    this.loaderService.display(true);
    var delivery = {
      "IdEntrega": this.data.object.IDEntrega
    };
    
    this.helperService.POST(`${this.urlApi}/cancelPrescriptionState/${this.helperService.secondToken}/delivery`, delivery
      ).subscribe(rs => {
        const res = rs.json();
        this.snackBar.open('Anulación Exitosa', 'Entrega anulada.', { duration: 4000 });
        this.dialogRef.close(true);
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
  }
  performDelivery(){
    this.loaderService.display(true);
    var delivery = {
      "ID": this.data.object.ID,
      "CodSerTecEntregado": this.data.object.CodSerTecAEntregar,
      "CantTotEntregada": this.data.object.CantTotAEntregar,
      "EntTotal": this.data.object.EntTotal,
      "CausaNoEntrega": this.data.object.CausaNoEntrega,
      "FecEntrega": this.data.object.FecEntrega,
      "NoLote": this.data.object.NoLote,
      "TipoIDRecibe": this.data.object.TipoIDRecibe,
      "NoIDRecibe": this.data.object.NoIDRecibe,
    };
    this.helperService.POST(`${this.urlApi}/changePrescriptionState/${this.helperService.secondToken}/delivery`, delivery
      ).subscribe(rs => {
        const res = rs.json();
        console.log(res);
        if(res.code == 422){
          console.log(JSON.parse(res.message));
          this.snackBar.open(JSON.parse(res.message)['Message'], '', { duration: 4000 });
        }else if(res.code == 200){
          this.snackBar.open('Entrega Exitosa', 'El registro de entrega ha sido creado.', { duration: 4000 });
          this.dialogRef.close(true);
        }else{
          this.snackBar.open(JSON.parse(res.message)['Message'], '', { duration: 4000 });
        }
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
  }
  performDeliveryReport(){
    this.loaderService.display(true);
    var delivery_report = {
      "ID": this.data.object.ID,
      "EstadoEntrega": this.data.object.EstadoEntrega,
      "CausaNoEntrega": this.data.object.CausaNoEntrega,
      "ValorEntregado": this.data.object.ValorEntregado
    };
    this.helperService.POST(`${this.urlApi}/changePrescriptionState/${this.helperService.secondToken}/delivery-report`, delivery_report
      ).subscribe(rs => {
        const res = rs.json();
        this.snackBar.open('Entrega Exitosa', 'El reporte de entrega ha sido creado.', { duration: 4000 });
        this.dialogRef.close(true);
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
  }
  cancelDeliveryReport(){
    this.loaderService.display(true);
    var delivery_report = {
      "IDReporteEntrega": this.data.object.IDReporteEntrega
    };
    
    this.helperService.POST(`${this.urlApi}/cancelPrescriptionState/${this.helperService.secondToken}/delivery-report`, delivery_report
      ).subscribe(rs => {
        const res = rs.json();
        this.snackBar.open('Anulación Exitosa', 'Reporte de Entrega anulado.', { duration: 4000 });
        this.dialogRef.close(true);
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
  }
  performBilling(){
    this.loaderService.display(true);
    var billing = {
      "NoPrescripcion": this.data.object.NoPrescripcion,
      "TipoTec": this.data.object.TipoTec,
      "ConTec": this.data.object.ConTec,
      "TipoIDPaciente": this.data.object.TipoIDPaciente,
      "NoIDPaciente": this.data.object.NoIDPaciente,
      "NoEntrega": this.data.object.NoEntrega,
      "NoSubEntrega": this.data.object.NoSubEntrega,
      "NoFactura": this.data.object.NoFactura,
      "NoIDEPS": this.data.object.NoIDEPS,
      "CodEPS": this.data.object.CodEPS,
      "CodSerTecAEntregado": this.data.object.CodSerTecAEntregado,
      "CantUnMinDis": this.data.object.CantUnMinDis,
      "ValorUnitFacturado": this.data.object.ValorUnitFacturado.replace(".", ","),
      "ValorTotFacturado": this.data.object.ValorTotFacturado.replace(".", ","),
      "CuotaModer": this.data.object.CuotaModer,
      "Copago": this.data.object.Copago
    };
    this.helperService.POST(`${this.urlApi}/changePrescriptionState/${this.helperService.secondToken}/billing`, billing
      ).subscribe(rs => {
        const res = rs.json();
        this.snackBar.open('Entrega Exitosa', 'El registro de facturación ha sido creado.', { duration: 4000 });
        this.dialogRef.close(true);
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
  }
  cancelBilling(){
    this.loaderService.display(true);
    console
    var billing = {
      "idFacturacion": this.data.object.IDFacturacion
    };
    this.helperService.POST(`${this.urlApi}/cancelPrescriptionState/${this.helperService.secondToken}/billing`, billing
      ).subscribe(rs => {
        const res = rs.json();
        this.snackBar.open('Anulación Exitosa', 'Facturación anulada.', { duration: 4000 });
        this.dialogRef.close(true);
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
  }
}