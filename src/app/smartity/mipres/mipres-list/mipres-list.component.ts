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
  @Input() role: String;
  constructor(public loaderService: LoaderService,
    public helperService: HelperService,
    public router: Router,
    public snackBar: MatSnackBar,
    private comp: MipresComponent) {
      super(loaderService, helperService);
      this.urlApi = '/api/mipres';
     }

  ngOnInit() {
    this.getSecondToken();
    this.search = '20201001192023404869';
    console.log(this.role);
  }
  private getSecondToken(){
    this.helperService
    .GET(`${this.urlApi}/generateToken`)
    .map((response: Response) => {
      const res = response.json();
      this.helperService.secondToken = res;
    })
    .subscribe(
      (error) => {
        this.loaderService.display(false);
      },
      (done) => {
        
        this.loaderService.display(false);
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
            break;
    }
    this.comp.openActions();
  }

  private prescriptionAddressing(){
    this.loaderService.display(true);
      this.helperService.GET(`${this.urlApi}/prescriptionAddressing/${this.helperService.secondToken}/${this.search}`
      ).subscribe(rs => {
        const res = rs.json();
        // res.data[0];
        // var prescription = {"prescriptionNumber": res.data[0]["NoPrescripcion"], "patient": res.data[0]["TipoIDPaciente"] + res.data[0]["NoIDPaciente"], "EPS": res.data[0]["CodEPS"], "addressingDate": res.data[0]["FecDireccionamiento"]};
        // this.list.push(prescription);
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
        console.log(err.message);
        this.loaderService.display(false);
    });
  }
  private getPrescriptions(){
    this.loaderService.display(true);
    this.list = [];
    var prescriptionNumber = {"prescriptionNumber": this.search};
      this.helperService.POST(`${this.urlApi}/prescriptions/${this.helperService.secondToken}`, prescriptionNumber
      ).subscribe(rs => {
        const res = rs.json();
        console.log(res);
        // res.data[0];
        var prescription = {"prescriptionNumber": res.data["NoPrescripcion"], "patient": res.data["TipoIDPaciente"] + res.data["NoIDPaciente"], "EPS": res.data["CodEPS"]};
        this.list.push(prescription);
        this.loaderService.display(false);
    }, err => {
        this.snackBar.open('Error', err.message, { duration: 4000 });
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
