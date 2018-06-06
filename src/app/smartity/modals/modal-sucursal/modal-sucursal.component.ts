import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { log } from 'util';

@Component({
    templateUrl: './modal-sucursal.component.html'
})

export class ModalSucursalComponent implements OnInit {

    private model: any = {};
    private countries: Array<any> = [];
    private departments: Array<any> = [];
    private cities: Array<any> = [];
    private booShow = true;

    constructor(private formBuilder: FormBuilder,
        private dialogRef: MdDialogRef<ModalSucursalComponent>,
        @Inject(MD_DIALOG_DATA) private data,
        private loaderService: LoaderService,
        private helperService: HelperService
    ) {


    }

    ngOnInit() {

        this.model = {};


        this.getCollection();
    }

    add() {
        this.model.country = this.countries.filter(x => x.id == this.model.country_id)[0];
        this.model.department = this.departments.filter(x => x.id == this.model.department_id)[0];
        this.model.city = this.cities.filter(x => x.id == this.model.city_id)[0];
        this.dialogRef.close(this.model);
    }

    /**
     * get the country and the tax regime with the collection of names
     */
    private getCollection() {
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ["COUNTRIES"])
            .map((response: Response) => {

                let res = response.json();
                this.countries = res.COUNTRIES;

                if (this.data) {
                    this.model = this.data;
                    this.booShow = false;
                    this.getDepartments();
                    this.getCities();
                }

            }).subscribe(
                error => {
                    this.loaderService.display(false);
                }, done => {
                    this.loaderService.display(false);
                });
    }

    private getDepartments() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/departamentos?pais_id=${this.model.country_id}`)
            .map((response: Response) => {

                let res = response.json();
                this.departments = res["departamentos"];

            }).subscribe(
                error => {
                    this.loaderService.display(false);
                }, done => {
                    this.loaderService.display(false);
                });
    }

    private getCities() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/ciudades?departamento_id=${this.model.department_id}`)
            .map((response: Response) => {

                let res = response.json();
                this.cities = res["ciudades"];

            }).subscribe(
                error => {
                    this.loaderService.display(false);
                }, done => {
                    this.loaderService.display(false);
                });
    }
}