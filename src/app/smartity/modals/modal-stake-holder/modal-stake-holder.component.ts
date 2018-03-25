import { Component, OnInit, Inject  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { BaseList } from '../../bases/base-list';

@Component({
    templateUrl: './modal-stake-holder.component.html'
})

export class ModalStakeHolderComponent extends BaseList implements OnInit {

    private model: any = {};

    constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MdDialogRef<ModalStakeHolderComponent>,
      @Inject(MD_DIALOG_DATA) private data,
      public loaderService: LoaderService,
      public helperService: HelperService) {
        super(loaderService, helperService);
        this.urlApi = `/api/search_stake_holder/${data.option}`;
    }

    ngOnInit() {
      this.model = {};
      this.getAll();
    }

    add() {
      this.dialogRef.close(this.model);
    }

    private addFromTable(obj) {

        this.dialogRef.close(obj);
        // this.loaderService.display(true);
        // this.helperService.GET(`${this.urlApi}/${obj.id}`)
        // .map((response: Response) => {

        //     const res = response.json();
        //     this.dialogRef.close(res.data);

        // }).subscribe(
        //     (error) => {
        //         this.loaderService.display(false);
        //     }, (done) => {
        //         this.loaderService.display(false);
        //     });
    }

    
    
  }