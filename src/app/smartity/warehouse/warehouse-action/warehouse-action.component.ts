import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { AuthenticationService } from '../../../auth/authentication.service';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel } from '../../bases/base-model';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { WarehouseComponent } from '../warehouse.component';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'warehouse-action-cmp',
    templateUrl: 'warehouse-action.component.html',
    styles: []
})

export class WarehouseActionComponent extends BaseModel implements OnInit {

    @Output() select = new EventEmitter();
    @Input() noaction: boolean;

    private countries: any[] = [];
    private departments: any[] = [];
    private cities: any[] = [];
    private warehouses: any[] = [];
    private operations_centre_groups: any[] = [];

    constructor(
        private loaderService: LoaderService,
        private helperService: HelperService,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private comp: WarehouseComponent
    ) {
        super();
    }

    ngOnInit() {
        this.clean();
        this.getCollection();
        if (this.numId !== undefined) {
            this.getDataById();
        }
    }

    private getCollection() {
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ['COUNTRIES', 'OPERATIONS_CENTRE_GROUPS', 'WAREHOUSE_TYPE']).subscribe(rs => {
            const res = rs.json();
            this.countries = res.COUNTRIES;
            this.operations_centre_groups = res.OPERATIONS_CENTRE_GROUPS;
            this.warehouses = res.WAREHOUSE_TYPE;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private getDepartments() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/departamentos?pais_id=${this.model.country_id}`).subscribe(rs => {
            const res = rs.json();
            this.departments = res.departamentos;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private getCities() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/ciudades?departamento_id=${this.model.department_id}`).subscribe(rs => {
            const res = rs.json();
            this.cities = res.ciudades;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private save() {
        this.loaderService.display(true);
        switch (this.strAction) {
            case 'Guardar':
                this.helperService.POST(`/api/warehouse`, this.model).subscribe(rs => {
                    const res = rs.json();
                    if (res.store) {
                        this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.snackBar.open(err.message, 'Guardado', { duration: 4000 });
                    this.loaderService.display(false);
                });
                break;
            case 'Actualizar':
                this.helperService.PUT(`/api/warehouse/${this.numId}`, this.model).subscribe(rs => {
                    const res = rs.json();
                    if (res.update) {
                        this.snackBar.open(res.message, 'Actualización', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.snackBar.open(err.message, 'Actualización', { duration: 4000 });
                    this.loaderService.display(false);
                });
                break;
            case 'Eliminar':
                this.helperService.DELETE(`/api/warehouse/${this.numId}`).subscribe(rs => {
                    const res = rs.json();
                    if (res.delete) {
                        this.snackBar.open(res.message, 'Eliminación', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.snackBar.open(err.message, 'Eliminación', { duration: 4000 });
                    this.loaderService.display(false);
                });
                break;
        }



    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/warehouse/${this.numId}`).subscribe(rs => {
            const res = rs.json();
            this.model = res.data;
            this.departments.push(this.model.geolocation.department);
            this.cities.push(this.model.geolocation.city);
            this.model.country_id = this.model.geolocation.country_id;
            this.model.department_id = this.model.geolocation.department_id;
            this.model.city_id = this.model.geolocation.city_id;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private clean() {
        this.cities = [];
        this.departments = [];
        this.model = {};
        this.model.state = true;
    }

    private goList() {
        this.comp.openList();
    }

}