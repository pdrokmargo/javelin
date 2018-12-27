import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { BaseModel } from '../../../bases/base-model';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
    selector: 'warehouse-action-cmp',
    templateUrl: 'warehouse-action.component.html',
    styles: []
})

export class WarehouseActionComponent extends BaseModel implements OnInit {

    @Output() select = new EventEmitter();


    private countries: any[] = [];
    private departments: any[] = [];
    private cities: any[] = [];
    private warehouses: any[] = [];
    private operations_centre_groups: any[] = [];
    private action_active: boolean;
    private str_action: string = 'Guardar';
    // id de registro seleccionado de la tabla

    constructor(private loaderService: LoaderService,
        private helperService: HelperService,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router) {

        super();

    }

    ngOnInit() {
        this.clean();
        this.getCollection();
        this.str_action = 'Guardar';
    }

    /**
     * get the country and the tax regime with the collection of names
     */
    private getCollection() {
        this.helperService.POST(`/api/collections`, ['COUNTRIES', 'OPERATIONS_CENTRE_GROUPS', 'WAREHOUSE_TYPE'])
            .map((response: Response) => {
                const res = response.json();
                this.countries = res.COUNTRIES;
                this.operations_centre_groups = res.OPERATIONS_CENTRE_GROUPS;
                this.warehouses = res.WAREHOUSE_TYPE;
            }).subscribe(
                (error) => {
                    console.log(error);
                }, (done) => { });
    }

    private getDepartments() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/departamentos?pais_id=${this.model.country_id}`)
            .map((response: Response) => {
                const res = response.json();
                console.log(res);
                this.departments = res.departamentos;
            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                }, (done) => {
                    this.loaderService.display(false);
                });
    }

    private getCities() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/ciudades?departamento_id=${this.model.department_id}`)
            .map((response: Response) => {
                const res = response.json();
                this.cities = res.ciudades;
            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                }, (done) => {
                    this.loaderService.display(false);
                });
    }

    private save() {

        /** Create */
        this.loaderService.display(true);
        this.helperService.POST(`/api/warehouse`, this.model)
            .map((response: Response) => {

                const res = response.json();
                if (res.status === 'success') {
                    this.snackBar.open(res.message, 'Guardado', {
                        duration: 3500,
                    });
                    this.clean();
                }
                this.select.emit(res.data);

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                }, (done) => {
                    this.loaderService.display(false);
                });


    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/warehouse/${this.numId}`)
            .map((response: Response) => {

                const res = response.json();
                this.model = res.data;
                this.departments.push(this.model.geolocation.department);
                this.cities.push(this.model.geolocation.city);
                this.model.country_id = this.model.geolocation.country_id;
                this.model.department_id = this.model.geolocation.department_id;
                this.model.city_id = this.model.geolocation.city_id;

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                }, (done) => {
                    this.loaderService.display(false);
                });
    }

    private clean() {
        this.cities = [];
        this.departments = [];
        this.model = {};
        this.model.state = true;
    }
}