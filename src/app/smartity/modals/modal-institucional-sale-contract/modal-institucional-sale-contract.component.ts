import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';

@Component({
    templateUrl: './modal-institucional-sale-contract.component.html'
})

export class ModalInstitucionalSaleContractComponent implements OnInit {

    private model: any = {};
    private booShow = true;


    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ModalInstitucionalSaleContractComponent>,
        @Inject(MAT_DIALOG_DATA) private data,
        private loaderService: LoaderService,
        private helperService: HelperService,
    ) {

    }

    ngOnInit() {
        this.model = {};
        if (this.data.data) {
            this.booShow = false;
            this.data.data.expiration_date = new Date(this.data.data.expiration_date);
            this.data.data.issue_date = new Date(this.data.data.issue_date);
            console.log(this.data.data);
            this.model = this.data.data;
        }
    }

    add() {
        this.dialogRef.close(this.model);
    }

    private getDepartments() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/departamentos?pais_id=${this.model.country_id}`)
            .map((response: Response) => {

                let res = response.json();

            }).subscribe(
                error => {
                    this.loaderService.display(false);
                }, done => {
                    this.loaderService.display(false);
                });
    }

    onFileSelect(event) {
        if (event != undefined && event != null) {
            this.model.file = event[0];
            this.model.is_file = true;
        }
    }

    onchange() {
        this.model.expiration_date = '';
    }

}