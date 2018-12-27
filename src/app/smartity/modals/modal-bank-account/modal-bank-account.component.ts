import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';

@Component({
    templateUrl: './modal-bank-account.component.html'
})

export class ModalBankAccountComponent implements OnInit {

    private model: any = {};
    private banks: Array<any> = [];
    private bank_account_types: Array<any> = [];
    private booShow = true;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ModalBankAccountComponent>,
        @Inject(MAT_DIALOG_DATA) private data,
        private loaderService: LoaderService,
        private helperService: HelperService,
    ) {

    }

    ngOnInit() {
        this.model = {};
        this.getCollection();
        if (this.data.data) {
            this.model = this.data.data;
            this.booShow = false;
        }
    }

    add() {
        this.banks.map(x => {
            if(x.id == this.model.bank) {
                this.model.bank_name = x.value;
            }
        });
        this.bank_account_types.map(x=>{
            if(x.id == this.model.bank_account_type) {
                this.model.bank_account_type_name = x.value;
            }
        });
        this.dialogRef.close(this.model);
    }

    /**
    *  get the country and the tax regime with the collection of names
    */
    private getCollection() {
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ['BANKS', 'BANK_ACCOUNT_TYPE'])
            .map((response: Response) => {

                const res = response.json();
                this.banks = res.BANKS;
                this.bank_account_types = res.BANK_ACCOUNT_TYPE;

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                }, (done) => {
                    this.loaderService.display(false);
                });
    }


}
