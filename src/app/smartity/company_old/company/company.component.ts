import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { AuthenticationService } from "../../../auth/authentication.service";
import { MatSnackBar } from "@angular/material";
import {ActivatedRoute, Router} from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';

@Component({
    selector: "company-cmp",
    templateUrl: "company.component.html",
    styles: []
})

export class CompanyComponent implements OnInit {
   
    private model: any = {};
    private countries: Array<any> = [];
    private departments: Array<any> = [];
    private cities: Array<any> = [];
    private tax_regime: Array<any> = []; 
    private withholding: Array<any> = []; 
    private action_active: boolean = false;
    private str_action: string = 'Guardar';
    //id de registro seleccionado de la tabla
    private numId: number = 0;

    constructor(private loaderService:LoaderService, 
                private helperService:HelperService,
                public snackBar: MatSnackBar,
                private route: ActivatedRoute,
                private router: Router) {
        
        //paramatro enviado desde la url          
        
    }
   
    ngOnInit() {
        this.clean();
        this.getCollection();

        if(this.route.snapshot.params['id']>0){
            this.numId=this.route.snapshot.params['id'];             
            this.str_action='Actualizar';
            this.getDataById();
        }else{
            this.str_action='Guardar';
        }   
    }
    
    /**
     * get the country and the tax regime with the collection of names
     */
    private getCollection(){
        this.helperService.POST(`/api/collections`, ["COUNTRIES", "TAX_REGIME", "WITHHOLDING_TYPE"])
        .map((response: Response) => {
            
            let res = response.json();
            this.countries = res.COUNTRIES;   
            this.tax_regime = res.TAX_REGIME;  
            this.withholding = res.WITHHOLDING_TYPE;  
            
        }).subscribe(
            error =>{
                // this.loaderService.display(false);    
            },done =>{        
                // this.loaderService.display(false);    
            });
    }

    private getDepartments(){
        this.loaderService.display(true); 
        this.helperService.GET(`/api/departamentos?pais_id=${this.model.country_id}`)
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
        this.helperService.GET(`/api/ciudades?departamento_id=${this.model.department_id}`)
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

    private save(){
        /** Update */
        if(this.model.id > 0){
            this.loaderService.display(true);
            this.helperService.PUT(`/api/company/${this.numId}`, this.model)
            .map((response: Response) => {
                
                let res = response.json();
                if (res.status == 'success') {                    
                    this.snackBar.open(res.message, 'Actualización', {
                        duration: 3500,
                    });
                    this.router.navigate(['app/company-list']);
                } 
                
            }).subscribe(
                error =>{
                    this.loaderService.display(false);    
                },done =>{        
                    this.loaderService.display(false);    
                });
        }else{
            /**Create */
            this.loaderService.display(true);
            this.helperService.POST(`/api/company`, this.model)
            .map((response: Response) => {
                
                let res = response.json();
                if (res.status == 'success') {                    
                    this.snackBar.open(res.message, 'Guardado', {
                        duration: 3500,
                    });    
                    this.clean();                
                }
                
            }).subscribe(
                error =>{
                    this.loaderService.display(false);    
                },done =>{        
                    this.loaderService.display(false);    
                });
        }           

    }    

    private getDataById(): void {
        this.loaderService.display(true);    
        this.helperService.GET(`/api/company/${this.numId}`)
        .map((response: Response) => {
            
            let res = response.json();
            this.model = res["data"];                        
            this.departments.push(this.model.geolocation.department);
            this.cities.push(this.model.geolocation.city);
            this.model.country_id = this.model.geolocation.country_id;
            this.model.department_id = this.model.geolocation.department_id;
            this.model.city_id = this.model.geolocation.city_id;
            
        }).subscribe(
            error =>{
                this.loaderService.display(false);    
            },done =>{        
                this.loaderService.display(false);    
            });
    }

    private clean(){
        this.cities=[];
        this.departments=[];
        this.model={};
        this.model.big_contributor=true;
        this.model.selfholder=true;
    }

   
}