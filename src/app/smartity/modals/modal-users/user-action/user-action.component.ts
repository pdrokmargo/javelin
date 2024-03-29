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
    selector: 'user-action-cmp',
    templateUrl: 'user-action.component.html',
    styles: []
})

export class UserActionComponent extends BaseModel implements OnInit {

    @Output() select = new EventEmitter();
    

    private companies: any[] = [];
    private user_profiles: any[] = [];
    private action_active: boolean;
    private str_action: string = 'Guardar';
    private model_user_company: any = {};

    constructor(public loaderService: LoaderService,
        public helperService: HelperService,
        public snackBar: MatSnackBar) {
        super();

    }

    ngOnInit() {

        this.clean();
        this.getUserProfiles();
        this.getCompanies();
        console.log(this.numId);

        if (this.numId > 0) {
            // this.numId=this.route.snapshot.params['id'];
            this.str_action = 'Actualizar';
            this.getDataById();
        } else {
            this.str_action = 'Guardar';
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
        if (this.model.usersprivileges.length === 0) {
            this.snackBar.open('Agregue una empresa para continuar.', 'Error', {
                duration: 3500,
            });
            return false;
        }

        /** Create */
        if (this.model.usersprivileges.length === 0) {
            this.snackBar.open('Agregue una empresa para continuar.', 'Error', {
                duration: 3500,
            });
            return false;
        }
        this.loaderService.display(true);
        this.helperService.POST(`/api/users`, this.model)
            .map((response: Response) => {

                const res = response.json();
                if (res.status === 'success') {
                    this.snackBar.open(res.message, 'Guardado', {
                        duration: 3500,
                    });
                    this.clean();
                    this.select.emit(res.data);
                }

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                }, (done) => {
                    this.loaderService.display(false);
                });


    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/users/${this.numId}`)
            .map((response: Response) => {
                console.log(response);

                let res = response.json();
                this.model = res.data;
                this.refreshCompany();

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

    private refreshCompany() {
        let j = 0;
        for (j = 0; j < this.companies.length; j++) {
            let i = 0;
            for (i = 0; i < this.model.usersprivileges.length; i++) {
                if (this.model.usersprivileges[i].company_id === this.companies[j].id) {
                    this.companies[j].hide = true;
                } else {
                    this.companies[j].hide = false;
                }
            }
        }

    }

    private addCompany() {
        this.model_user_company.company_id = this.model_user_company.company.id;
        this.model_user_company.user_profile_id = this.model_user_company.userprofile.id;
        this.model.usersprivileges.push(this.model_user_company);
        this.model_user_company = {};
        this.model_user_company.id = 0;
        this.refreshCompany();
    }

    private removeCompany(obj: any) {

        if (obj.id > 0 && obj.company_id === this.model.company_default_id) {
            this.snackBar.open('Usted no puede remover una empresa activa!', 'Error', {
                duration: 3500,
            });

            return false;
        }
        const index = this.model.usersprivileges.indexOf(obj);
        this.model.usersprivileges.splice(index, 1);
        this.refreshCompany();
    }

}
