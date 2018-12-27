import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { isNumber, isNullOrUndefined } from 'util';
import { BaseList } from '../../bases/base-list';

@Component({
    templateUrl: './modal-geolocation.component.html'
})

export class ModalGeolocationComponent {

    private model: any = {};
    private arrCountry: any = [];
    private arrDepartment: any = [];
    private arrCity: any = [];
    private booGeolocation:boolean = false;

    constructor(
        public dialogRef: MatDialogRef<ModalGeolocationComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        public helperService: HelperService,
    ) {
        this.loadCountry();
    }

    add() {
        this.dialogRef.close(this.model);
    }

    private loadCountry() {
        this.arrDepartment = [];
        this.arrCity = [];
        this.booGeolocation = false;
        this.helperService.POST(`/api/collections`, ["COUNTRIES"]).subscribe(rs => {
            let res = rs.json();
            this.arrCountry = res.COUNTRIES;
        }, err => {
            console.log(err);
        });
    }

    private loadDepartment() {
        this.arrCity = [];
        this.booGeolocation = false;
        this.helperService.GET(`/api/departamentos?pais_id=${this.model.country.id}`).subscribe(rs => {
            let res = rs.json();
            this.arrDepartment = res.departamentos;
        }, err => {
            console.log(err);
        });
    }

    private loadCity() {
        this.helperService.GET(`/api/ciudades?departamento_id=${this.model.department.id}`).subscribe(rs => {
            let res = rs.json();
            this.arrCity = res.ciudades;
        }, err => {
            console.log(err);
        });
    }
}
