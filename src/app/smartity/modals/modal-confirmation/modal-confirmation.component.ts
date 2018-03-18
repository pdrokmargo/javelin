import { Component, OnInit, Inject  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './modal-confirmation.component.html'
})

export class ModalConfirmationComponent implements OnInit {
   
    constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MdDialogRef<ModalConfirmationComponent>,
      @Inject(MD_DIALOG_DATA) private data: any) {

    }
  
    ngOnInit() {          
    }
       
    acept() {      
      this.dialogRef.close(true);
    }

    
  }