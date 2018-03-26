import { Component, OnInit, Inject  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';

@Component({
    templateUrl: './modal-resolution.component.html'
})

export class ModalResolutionComponent implements OnInit {
    
    private model: any = {};
   

    constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MdDialogRef<ModalResolutionComponent>,
      @Inject(MD_DIALOG_DATA) private data,
      private loaderService:LoaderService, 
      private helperService:HelperService,
    ) {

    }
  
    ngOnInit() {     
      this.model = {};          
    }
       
    add() {     
      this.dialogRef.close(this.model);
    }

    private getDepartments(){
        this.loaderService.display(true); 
        this.helperService.GET(`/api/departamentos?pais_id=${this.model.country_id}`)
        .map((response: Response) => {
            
            let res = response.json();
                        
        }).subscribe(
            error =>{
                this.loaderService.display(false);    
            },done =>{        
                this.loaderService.display(false);    
            });
    }

    onchange(){
        this.model.expiration_date='';
    }
    
  }