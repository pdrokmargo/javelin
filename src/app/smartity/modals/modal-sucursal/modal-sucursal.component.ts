import { Component, OnInit, Inject  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';

@Component({
    templateUrl: './modal-sucursal.component.html'
})

export class ModalSucursalComponent implements OnInit {
    
    private model: any = {};
    private countries: Array<any> = [];
    private departments: Array<any> = [];
    private cities: Array<any> = [];

    constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MdDialogRef<ModalSucursalComponent>,
      @Inject(MD_DIALOG_DATA) private data,
      private loaderService:LoaderService, 
      private helperService:HelperService,
    ) {}
  
    ngOnInit() {     
      this.model = {};
      this.getCollection();      
    }
       
    add() {     
      this.dialogRef.close(this.model);
    }

    /**
     * get the country and the tax regime with the collection of names
     */
    private getCollection(){
      this.loaderService.display(true); 
      this.helperService.POST(`/api/collections`, ["COUNTRIES"])
      .map((response: Response) => {
          
          let res = response.json();
          this.countries = res.COUNTRIES;   
          
      }).subscribe(
          error =>{
              this.loaderService.display(false);    
          },done =>{        
              this.loaderService.display(false);    
          });
    }

    private getDepartments(){
        this.loaderService.display(true); 
        this.helperService.GET(`/api/departamentos?pais_id=${this.model.country.id}`)
        .map((response: Response) => {
            
            let res = response.json();
            this.departments = res["departamentos"];  
            
        }).subscribe(
            error =>{
                this.loaderService.display(false);    
            },done =>{        
                this.loaderService.display(false);
            });
    }

    private getCities(){
        this.loaderService.display(true); 
        this.helperService.GET(`/api/ciudades?departamento_id=${this.model.department.id}`)
        .map((response: Response) => {
            
            let res = response.json();
            this.cities = res["ciudades"];    
            
        }).subscribe(
            error =>{
                this.loaderService.display(false);    
            },done =>{        
                this.loaderService.display(false);    
            });
    }
  }