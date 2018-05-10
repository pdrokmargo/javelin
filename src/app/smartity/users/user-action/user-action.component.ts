import { Component, OnInit, ViewChild, Output, Input, EventEmitter, ElementRef } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl, NgControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel } from '../../bases/base-model';
import { UsersComponent } from '../users.component';
import { HelperService, LoaderService } from '../../../shared';
import { Response } from '@angular/http';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'user-action-cmp',
    templateUrl: 'user-action.component.html',
    styles: []
})

export class UserActionComponent extends BaseModel implements OnInit {

    private ref = undefined;
    private companies: any[] = [];
    private user_profiles: any[] = [];
    private model_user_company: any = {};
    private booEmail: boolean;
    private booEmailValid: boolean = false;
    private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    constructor(public loaderService: LoaderService,
        public helperService: HelperService,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private comp: UsersComponent) {
        super();

    }

    ngOnInit() {
        this.clean();
        this.getUserProfiles();
        this.getCompanies();

        if (this.numId != undefined) {
            this.getDataById();
        }
    }

    private getUserProfiles() {

        this.helperService.GET(`/api/userprofile?all=1`).map((response: Response) => {
            const res = response.json();
            this.user_profiles = res.data;
        }).subscribe(
            (error) => {
                // this.loaderService.display(false);
            }, (done) => {
                // this.loaderService.display(false);
            });
    }

    private getCompanies() {
        this.helperService.GET(`/api/company`)
            .map((response: Response) => {
                const res = response.json();
                this.companies = res['data'];
            }).subscribe(
                (error) => {
                    // this.loaderService.display(false);
                }, (done) => {
                    // this.loaderService.display(false);
                });
    }

    private save() {
        /** Update */
        if (this.model.usersprivileges.length === 0) {
            this.snackBar.open('Agregue una empresa para continuar.', 'Error', {
                duration: 4000,
            });
            return false;
        }

        this.loaderService.display(true);
        switch (this.strAction) {
            case 'Guardar':
                this.helperService.POST(`/api/users`, this.model).subscribe(rs => {
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
                this.helperService.PUT(`/api/users/${this.numId}`, this.model).subscribe(rs => {
                    const res = rs.json();
                    if (res.update) {
                        this.snackBar.open(res.message, 'Actualización', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.loaderService.display(false);
                    this.snackBar.open(err.message, 'Actualización', { duration: 4000 });
                });
                break;
            case 'Eliminar':
                this.helperService.DELETE(`/api/users/${this.numId}`).subscribe(rs => {
                    const res = rs.json();
                    if (res.delete) {
                        this.snackBar.open(res.message, 'Eliminación', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.loaderService.display(false);
                    this.snackBar.open(err.message, 'Eliminación', { duration: 4000 });
                });
                break;
        }

    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/users/${this.numId}`)
            .map((response: Response) => {
                
                let res = response.json();
                this.ref = res.data.email;
                this.model = res.data;

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                }, (done) => {
                    this.loaderService.display(false);
                });
    }

    private clean() {
        this.model = {};
        this.model.usersprivileges = [];
        this.model.status = true;
    }

    private addCompany() {
        if (this.model.usersprivileges) {
            this.model_user_company.company_id = this.model_user_company.company.id;
            this.model_user_company.user_profile_id = this.model_user_company.userprofile.id;

            if (this.model.usersprivileges.length == 0) {
                this._addCompany();
            } else {
                var exist = false;
                this.model.usersprivileges.forEach((element, index) => {
                    console.log(index);
                    console.log(element);


                    if (element.company_id == this.model_user_company.company_id) {
                        exist = true;
                    }
                    if (index == this.model.usersprivileges.length - 1) {
                        if (!exist) {
                            this._addCompany();
                        } else {
                            this.snackBar.open('El usuario ya tiene un perfil registrado en esta empresa', 'Error', {
                                duration: 4000,
                            });
                        }
                    }
                });
            }
        }
    }
    private _addCompany() {
        this.model.usersprivileges.push(this.model_user_company);
        this.model_user_company = {};
    }

    private removeCompany(obj: any) {

        if (obj.id > 0 && obj.company_id === this.model.company_default_id) {
            this.snackBar.open('Usted no puede remover una empresa activa!', 'Error', {
                duration: 4000
            });
            return false;
        }
        const index = this.model.usersprivileges.indexOf(obj);
        this.model.usersprivileges.splice(index, 1);
    }

    private goList() {
        this.comp.openList();
    }

}