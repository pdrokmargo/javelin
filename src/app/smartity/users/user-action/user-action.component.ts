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
    styles: [
        `.add-company-panel {
            width: 100%;
            max-width: 700px;
            margin: 15px auto;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            padding: 20px 0;
            border-radius: 4px;
        }
        .add-company-panel h3 {
            color: #b7b7b7;
            margin-top: 0;
            font-size: 1.8em;
        }
        `
    ]
})

export class UserActionComponent extends BaseModel implements OnInit {

    private _model: any = {
        user: {
            status: true
        },
        userprofiles: []
    }

    private ref = undefined;
    private companies: any[] = [];
    private userprofiles: any[] = [];
    private company_userprofile: any = {};
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
        this.getUserProfiles();
        this.getCompanies();

        if (this.numId != undefined) {
            this.getDataById();
        }
    }

    private getUserProfiles() {
        this.helperService.GET(`/api/userprofile?all=1`).subscribe(rs => {
            const res = rs.json();
            this.userprofiles = res.data;
        }, err => {
            console.log(err);
        });
    }

    private getCompanies() {
        this.helperService.GET(`/api/company`).subscribe(rs => {
            const res = rs.json();
            this.companies = res['data'];
        }, err => {
            console.log(err);

        });
    }

    private save() {
        if (this._model.userprofiles.length === 0) {
            this.snackBar.open('El usuario debe estar vinculado por lo menos a una empresa', 'Error', {
                duration: 4000,
            });
            return false;
        }

        this._model.userprofiles.map(x => {
            if (x.default) {
                this._model.user.company_default_id = x.company_id;
                this._model.user.user_profile_id = x.user_profile_id;
            }
        });


        this.loaderService.display(true);
        switch (this.strAction) {
            case 'Guardar':
                this.helperService.POST(`/api/users`, this._model).subscribe(rs => {
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
                this.helperService.PUT(`/api/users/${this.numId}`, this._model).subscribe(rs => {
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
        this.helperService.GET(`/api/users/${this.numId}`).subscribe(rs => {
            let res = rs.json();
            this.ref = res.data.user.email;
            this._model = res.data;
            this._model.userprofiles.map(x => {
                x.default = false;
                if (x.company_id == this._model.user.company_default_id) {
                    x.default = true;
                }
            });
            this.loaderService.display(false);
        }, err => {
            this.loaderService.display(false);
            console.log(err);
        });
    }
    private isDefault(item) {
        this._model.userprofiles.map(x => {
            x.default = false
        });
        item.default = true;
    }
    private addCompany() {

        var cu_relation: any = {
            company_id: this.company_userprofile.company.id,
            company_name: this.company_userprofile.company.name,
            user_profile_id: this.company_userprofile.userprofile.id,
            user_profile_description: this.company_userprofile.userprofile.up_description,
            default: false
        };


        if (this._model.userprofiles.length == 0) {
            cu_relation.default = true;
            this._addCompany(cu_relation);
        } else {
            var exist = false;
            this._model.userprofiles.forEach((element, index) => {
                if (element.company_id == cu_relation.company_id) {
                    exist = true;
                }
                if (index == this._model.userprofiles.length - 1) {
                    if (!exist) {
                        this._addCompany(cu_relation);
                    } else {
                        this.snackBar.open('El usuario ya tiene un perfil registrado en esta empresa', 'Error', {
                            duration: 4000,
                        });
                    }
                }
            });

        }
    }
    private _addCompany(data) {
        this._model.userprofiles.push(data);
        this.company_userprofile = {};
    }

    private removeCompany(obj: any) {
        if (this._model.userprofiles.length > 0) {
            if (obj.default) {
                this._model.userprofiles[0].default = true;
            }
        }
        this._model.userprofiles.splice(this._model.userprofiles.indexOf(obj), 1);
    }

    private goList() {
        this.comp.openList();
    }

}