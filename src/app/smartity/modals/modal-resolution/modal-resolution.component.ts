import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { ModalPharmaceuticalComponent } from '..';

@Component({
    templateUrl: './modal-resolution.component.html'
})

export class ModalResolutionComponent implements OnInit {
    private booShow = true;
    private model: any = {
        pharmaceutical_drugs: []
    };
    private modalPharmaceuticalDialogRef: MatDialogRef<ModalPharmaceuticalComponent>;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ModalResolutionComponent>,
        @Inject(MAT_DIALOG_DATA) private data,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private dialog: MatDialog
    ) {

    }

    ngOnInit() {
        this.model = {
            pharmaceutical_drugs: []
        };
        if (this.data.data) {
            this.data.data.expiration_date = new Date(this.data.data.expiration_date);
            this.data.data.issue_date = new Date(this.data.data.issue_date);
            this.model = this.data.data;
            this.booShow = false;
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

    onchange() {
        this.model.expiration_date = '';
    }

    openPharmaceutical() {
        this.modalPharmaceuticalDialogRef = this.dialog.open(ModalPharmaceuticalComponent, {
            hasBackdrop: false,
            data: {
                title: 'Productos asociados'
            }
        });

        this.modalPharmaceuticalDialogRef.afterClosed().subscribe(data => {
            if (data) {
                if (this.model.pharmaceutical_drugs.length == 0) {
                    this.model.pharmaceutical_drugs.push({
                        id: data.id,
                        name: data.name,
                        dosage_form: data.dosage_form
                    });
                } else {
                    var exist = false;
                    this.model.pharmaceutical_drugs.forEach((element, index) => {
                        console.log(element);

                        if (element.id == data.id) {
                            exist = true;
                        }
                        if (this.model.pharmaceutical_drugs.length - 1 == index) {
                            if (!exist) {
                                this.model.pharmaceutical_drugs.push({
                                    id: data.id,
                                    name: data.name,
                                    dosage_form: data.dosage_form
                                });
                            }
                        }
                    });
                }
            }
        });
    }

}