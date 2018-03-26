import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { AuthenticationService } from "../../../auth/authentication.service";
import { MdSnackBar } from "@angular/material";
import {ActivatedRoute, Router} from '@angular/router';
import {BaseModel} from '../../bases/base-model';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { CostscentresComponent } from '../costscentres.component';

@Component({
    selector: "costscentres-action-cmp",
    templateUrl: "costscentres-action.component.html",
    styles: []
})

export class CostscentresActionComponent extends BaseModel implements OnInit {
    
    private tipos: Array<any> = [];
    private costs_centres_groups: Array<any> = [];  
    private costs_centres_types: Array<any> = [];
    private operations_costs_centres: Array<any> = [];   
    private action_active: boolean; 
    private str_action: string = 'Guardar';
    //id de registro seleccionado de la tabla
    
    constructor(public snackBar: MdSnackBar,
                private route: ActivatedRoute,
                private router: Router,
                private loaderService:LoaderService, 
                private helperService:HelperService,
                private comp: CostscentresComponent) {
        super();   
        
    }
   
    ngOnInit() {

        this.clean();
        this.getCollection();
        this.getCostCentres();

        if(this.numId>0){
            // this.numId=this.route.snapshot.params['id'];             
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
          
        this.helperService.POST(`/api/collections`, ["COSTS_CENTRE_GROUPS", "COSTS_CENTRE_TYPES"])
        .map((response: Response) => {

            let res = response.json();           
            this.costs_centres_groups = res.COSTS_CENTRE_GROUPS;
            this.costs_centres_types = res.COSTS_CENTRE_TYPES;

        }).subscribe(
        error =>{
            // this.loaderService.display(false);    
        },done =>{        
            // this.loaderService.display(false);    
        });
    }
    
    private getCostCentres(){
        this.helperService.GET(`/api/costs_centre/operations_costs_centre`)
        .map((response: Response) => {

        this.operations_costs_centres = response.json().data;

        }).subscribe(
        error =>{
            // this.loaderService.display(false);    
        },done =>{        
            // this.loaderService.display(false);    
        });
    }
    
    private save(){
        /** Update */
        if(this.model.id > 0){
            this.loaderService.display(true);	
            this.helperService.PUT(`/api/costscentres/${this.numId}`, this.model)
            .map((response: Response) => {
                
                let res=response.json();
                if (res.status == 'success') {                    
                    this.snackBar.open(res.message, 'Actualización', {
                        duration: 3500,
                    });
                    // this.router.navigate(['app/costs-centres-list']);
                    this.comp.openList();
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
            this.helperService.POST(`/api/costscentres`, this.model)
            .map((response: Response) => {
                
                let res=response.json();
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
        this.helperService.GET(`/api/costscentres/${this.numId}`)
        .map((response: Response) => {
            
            let res=response.json();
            this.model = res.data;
            this.model.operation_cost_centre_id = this.model.root==true ? 'co-'+this.model.operation_cost_centre_id : 'cc-'+this.model.operation_cost_centre_id;

        }).subscribe(
        error =>{
            this.loaderService.display(false);    
        },done =>{        
            this.loaderService.display(false);    
        });
    }

    private clean(){       
        this.model={};
        this.model.code='cc000';
        this.model.state=true;
    }

    private goList(){
        this.comp.openList();
    }

   
}