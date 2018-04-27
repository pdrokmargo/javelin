import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel } from '../../bases/base-model';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { UserprofileComponent } from '../userprofile.component';

@Component({
    selector: 'userprofile-action-cmp',
    templateUrl: 'userprofile-action.component.html',
    styles: []
})

export class UserprofileActionComponent extends BaseModel implements OnInit {

    private viewactions: any[] = [];
    //private action_active: boolean = false;
    private booActive: boolean = false;

    constructor(private loaderService: LoaderService,
        private helperService: HelperService,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private comp: UserprofileComponent) {

        super();

    }

    ngOnInit() {

        this.clean();
        this.getViewActions();
        if (this.numId != undefined) {

            this.getDataById();
        }
    }

    private getViewActions() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/viewactions`)
            .map((response: Response) => {

                let res = response.json();
                this.viewactions = res['data'];

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                }, (done) => {
                    this.loaderService.display(false);
                });
    }

    private save() {

        this.loaderService.display(true);
        switch (this.strAction) {
            case 'Guardar':
                this.viewactions.forEach((item) => {
                    let i = 0;
                    item.actions.forEach((act) => {
                        if (act.status) {
                            if (i === 0) {
                                this.model.privileges.push(item);
                                i++;
                            }
                        }
                    });
                });
                this.helperService.POST(`/api/userprofile`, this.model).subscribe(rs => {
                    let res = rs.json();
                    if (res.store) {
                        this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
                        this.comp.openList();
                        this.loaderService.display(false);
                    }
                }, err => {
                    this.snackBar.open(err.message, 'Guardado', { duration: 4000 });
                    this.loaderService.display(false);
                });


                break;
            case 'Actualizar':
                this.model.privileges = [];
                this.viewactions.forEach((item) => {
                    let i = 0;
                    item.actions.forEach((act) => {
                        if (act.status) {
                            if (i === 0) {
                                this.model.privileges.push(item);
                                i++;
                            }
                        }
                    });
                });
                this.helperService.PUT(`/api/userprofile/${this.numId}`, this.model).subscribe(rs => {
                    let res = rs.json();
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
                this.helperService.DELETE(`/api/userprofile/${this.numId}`).subscribe(rs => {
                    let res = rs.json();
                    if (res.update) {
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
        this.helperService.GET(`/api/userprofile/${this.numId}`)
            .map((response: Response) => {

                const res = response.json();
                this.model = res['data'];
                // mostrar los permisos chequeados
                this.viewactions.forEach((item) => {
                    item.actions.forEach((act) => {
                        this.model.privileges.forEach((priv) => {
                            if (priv.view_id === item.view_id) {
                                priv.actions.forEach((actPriv) => {
                                    if (act.action === actPriv.action) {
                                        act.status = actPriv.status;
                                    }
                                });
                            }
                        });
                    });
                });

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                }, (done) => {
                    this.loaderService.display(false);
                });

    }

    private clean() {
        this.model = {};
        this.model.up_state = true;
        this.model.privileges = [];
    }

    private expandPrivileges(item: any) {
        item.expand = !item.expand;
    }

    private checkAll(item: any) {
        item.actions.forEach((element) => {
            element.status = item.check;
        });
    }

    private goList() {
        this.comp.openList();
    }

}
