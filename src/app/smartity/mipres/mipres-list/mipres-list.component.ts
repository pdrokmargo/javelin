import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { MipresComponent } from '../mipres.component';
import { Response } from '@angular/http';
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";

@Component({
  selector: 'mipres-list-cmp',
  templateUrl: './mipres-list.component.html',
  styleUrls: ['./mipres-list.component.scss']
})
export class MipresListComponent extends BaseList  implements OnInit {
  respuesta: String = 'No';  
  prescriptionDate: Date;
  nationalServiceState: Boolean = true;
  @Input() role: String;
  addressingList: any[] = [];
  constructor(public loaderService: LoaderService,
    public helperService: HelperService,
    public router: Router,
    public snackBar: MatSnackBar,
    private comp: MipresComponent) {
      super(loaderService, helperService);
      this.urlApi = '/api/mipres';
      this.prescriptionDate = new Date();
     }

  ngOnInit() {
    if(this.helperService.secondToken == undefined){
      this.getSecondToken();
    }
    // this.search = '20201001192023404869';
  }
  private getSecondToken(){
    this.loaderService.display(true);
    this.helperService
    .GET(`${this.urlApi}/generateToken`)
    .map((response: Response) => {
      const res = response.json();
      this.helperService.secondToken = res.value;
      // localStorage.setItem("mipresSecondToken", JSON.stringify({
      //   token: res
      // })); 
    })
    .subscribe(
      done => {
        
        this.loaderService.display(false);
        
      },
      error => {
        console.log(error);
        this.loaderService.display(false);
        if(error.status == 500){
          this.nationalServiceState = false;
        }
        this.snackBar.open('Servicio Nacional MiPRES', 'Inestabilidad en el servicio.', { duration: 4000 });
        
      }
      
    );
  
  }
  private CUD(action:string, row?:any){
    this.comp.strAction = action;
    switch (action) {
        case 'Guardar':
            this.comp.id = undefined;
            break;
        default:
            this.comp.id = row.prescriptionNumber;
            this.comp.addressingList = this.addressingList;
            // this.comp.products = this.addressingList;
            break;
    }
    this.comp.openActions();
  }

  private prescriptionAddressing(){
    this.loaderService.display(true);
      this.helperService.GET(`${this.urlApi}/prescriptionAddressing/${this.helperService.secondToken}/${this.search}`
      ).subscribe(rs => {
        const res = rs.json();
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
  }
  private getPrescriptions(){
    if(this.helperService.secondToken == undefined){
      this.getSecondToken();
    }
    this.nationalServiceState = this.helperService.secondToken == undefined ? false : true;
    this.loaderService.display(true);
    this.list = [];
    var data = {};
    if(this.search != ''){
      data["prescriptionNumber"] = this.search;
    }
    data["prescriptionDate"] = this.prescriptionDate;
    console.log(data);
      this.helperService.POST(`${this.urlApi}/prescriptions/${this.helperService.secondToken}`, data
      ).subscribe(rs => {
        const res = rs.json();
        if(res.data.length == 0 && res.code == 200){
          this.snackBar.open('Error en prescripción', 'No existe información asociada.', { duration: 4000 });
        }
        if(res.code >= 400){
          this.snackBar.open('Servicio Nacional MiPRES', 'Inestabilidad en el servicio.', { duration: 4000 });
        }
        this.comp.products = res.products;
        res.data.forEach(prescription => {
          this.addressingList.push(prescription);
          var pre = {"prescriptionNumber": prescription["NoPrescripcion"], "patient": prescription["TipoIDPaciente"] + prescription["NoIDPaciente"], "EPS": prescription["CodEPS"]+ ":" + this.comp.epsList.find(element => element["CodEPS"] == prescription["CodEPS"])["DescEPS"]};
          var exist = this.list.find(x => x["prescriptionNumber"] === prescription["NoPrescripcion"]);
          if(exist == undefined || exist == null || !exist){
            this.list.push(pre);
          }
        });
        
        this.loaderService.display(false);
        this.nationalServiceState = this.helperService.secondToken == undefined ? false : true;
    }, err => {
         this.nationalServiceState = false;
        this.snackBar.open('Servicio Nacional MiPRES', 'Inestabilidad en el servicio.', { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
  }
  private prescriptionDelivery(){
    
  }
  private prescriptionDeliveryReport(){
    
  }
  private prescriptionBilled(){
    
  }
  private enterRaw(event: any, url: any){
    if (event.keyCode === 13) {
      this.getPrescriptions();
    }
  }
}
