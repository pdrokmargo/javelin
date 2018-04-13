import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { AuthenticationService } from '../../../auth/authentication.service';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel } from '../../bases/base-model';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { OperationscentreComponent } from '../operationscentre.component';

@Component({
    selector: 'operationscentre-action-cmp',
    templateUrl: 'operationscentre-action.component.html',
    styles: []
})

export class OperationscentreActionComponent extends BaseModel implements OnInit {

    private countries: any[] = [];
    private departments: any[] = [];
    private cities: any[] = [];
    private operations_centre_groups: any[] = [];
    private pattern = /[0-9\+\-\ ]/;

    constructor(
        private loaderService: LoaderService,
        private helperService: HelperService,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private comp: OperationscentreComponent
    ) {
        super();
    }

    ngOnInit() {
        this.clean();
        this.getCollection();
        if (this.numId != undefined) {
            this.getDataById();
        }
    }
    
    private getCollection(){
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ['COUNTRIES', 'OPERATIONS_CENTRE_GROUPS']).subscribe(rs => {
            const res = rs.json();
            this.countries = res.COUNTRIES;
            this.operations_centre_groups = res.OPERATIONS_CENTRE_GROUPS;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private getDepartments(){
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

    private getCities(){
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

    private save(){
        this.loaderService.display(true);
        switch (this.strAction) {
            case 'Guardar':
                this.helperService.POST(`/api/operationscentres`, this.model).subscribe(rs => {
                    const res = rs.json();
                    if (res.store) {
                        this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
                        this.goList();
                    }
                }, err => {
                    this.loaderService.display(false);
                    this.snackBar.open(err.message, 'Guardado', { duration: 4000 });
                });
            break;
            case 'Actualizar':
                this.helperService.PUT(`/api/operationscentres/${this.numId}`, this.model).subscribe(rs => {
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
                this.helperService.DELETE(`/api/operationscentres/${this.numId}`).subscribe(rs => {
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
        this.helperService.GET(`/api/operationscentres/${this.numId}`)
        .map((response: Response) => {

            const res = response.json();
            this.model = res.data;
            this.departments.push(this.model.geolocation.department);
            this.cities.push(this.model.geolocation.city);
            this.model.country_id = this.model.geolocation.country_id;
            this.model.department_id = this.model.geolocation.department_id;
            this.model.city_id = this.model.geolocation.city_id;

        }).subscribe(
        (error) =>{
            this.loaderService.display(false);
        },
        (done) => {
            this.loaderService.display(false);
        });
    }

    private clean() {
        this.cities = [];
        this.departments = [];
        this.model = {};
        this.model.code = 'co000';
        this.model.state = true;
    }

    private goList(){
        this.comp.openList();
    }


}